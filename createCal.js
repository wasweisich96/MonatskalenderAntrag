	// dm und dj sind Monat und Jahr, die im Kalender dargestellt werden
	// insbesondere könnte auch ein Monat gewählt werden, in dem das aktuelle Datum nicht vorkommt
    var d = new Date();
    var dm = d.getMonth() + 1;
    var dj = d.getYear() + 1900;
    var rowCounter=0;
	var elem = document.getElementById('prevMonthBtn');
	elem.addEventListener('click', prevMonth);	
	var elem = document.getElementById('nextMonthBtn');
	elem.addEventListener('click', nextMonth);	
//	createTable();
	Kalender(dm, dj);
	
	function RemoveCal() {
	var i = 0;
	while (i < rowCounter) {
	i++;
	 document.getElementById("kalender").deleteRow(0); 
	}
	}
	
	/*function createTable() {
	
	
	}
	*/
	
	function prevMonth () {
	RemoveCal()
		
	if(dm-1 == 0) {
	Kalender(dm=12, --dj)
	} else {
	Kalender(--dm,dj)
	}
	}
	
	function nextMonth () {
	RemoveCal()
	if(dm == 12) {

	Kalender(dm=1, ++dj)
	} else {
		Kalender(++dm,dj)
	}
	}

    function Kalender (Monat, Jahr) {

      Monatsname = new Array("Januar", "Februar", "März", "April", "Mai", "Juni",
                             "Juli", "August", "September", "Oktober", "November", "Dezember");
      Tag = new Array("Mo", "Di", "Mi", "Do", "Fr", "Sa", "So");

	  // aktuelles Datum für die spätere Hervorhebung ermitteln
      var jetzt = new Date();
      var DieserMonat = jetzt.getMonth() + 1;
      var DiesesJahr = jetzt.getYear() + 1900;
      var DieserTag = jetzt.getDate();
	  
	  // ermittle Wochentag des ersten Tags im Monat halte diese Information in Start fest
      var Zeit = new Date(Jahr, Monat - 1, 1);
      var Start = Zeit.getDay();

      if (Start > 0) {
       Start--;
      } else {
        Start = 6;
      }

	  // die meisten Monate haben 31 Tage...
      var Stop = 31;

	  // ...April (4), Juni (6), September (9) und November (11) haben nur 30 Tage...
      if (Monat == 4 || Monat == 6 || Monat == 9 || Monat == 11) --Stop;

	  // ...und der Februar nur 28 Tage...
      if (Monat == 2) {
                      Stop = Stop-3;
		// ...außer in Schaltjahren
        if (Jahr %   4 == 0) Stop++;
        if (Jahr % 100 == 0) Stop--;
        if (Jahr % 400 == 0) Stop++;
      }

      var tabelle = document.getElementById('kalender');
	  // schreibe Tabellenüberschrift
      var Monatskopf = Monatsname[Monat - 1] + " " + Jahr;
	  var caption = tabelle.createCaption();
	  caption.innerHTML = Monatskopf;

      // schreibe Tabellenkopf; Breite von der Tabelle  bestimmen
	   var row = tabelle.insertRow(0);
       for (var i = 0; i <= 6; i++) {
			var cell = row.insertCell(i);
            cell.innerHTML = Tag[i];
	   }

      // ermittle Tag und schreibe Zeile
      var Tageszahl = 1;
 
		//insert i anzahl an Rows in die Tabelle 
      for (var i = 0; i <= 5; i++) { 
        var row = tabelle.insertRow(1 +i);
		
		//insert j Anzahl an spalten
        for (var j = 0; j <= 6; j++) {
		  
		  // Zellen vor dem Start-Tag in der ersten Zeile und Zeilen nach dem Stop-Tag werden leer aufgefüllt
          if ( ((i == 0) && (j <= 5) && (j < Start)) || (Tageszahl > Stop) ) { //j<= 5 urpsürnglich, aber um 1 erhöht, damit Monate mit 6 Reihen korrekt angezeigt werden.
			var cell = row.insertCell(j);
            cell.innerHTML = ' ';
          } else {
		    // normale Zellen werden mit der Tageszahl befüllt und mit der Klasse Kalendertag markiert
			var cell = row.insertCell(j);
            cell.innerHTML = Tageszahl;
			cell.className = 'kalendertag'
			  
			// und der aktuelle Tag (heute) wird noch einmal speziell mit der Klasse "heute" markiert
            if ((Jahr == DiesesJahr) && (Monat == DieserMonat) && (Tageszahl == DieserTag)) {
              cell.className = cell.className+' heute';  
            }
              
			Tageszahl++;	
          }
        }
      }
	  //6te Row entfernen, wenn diese leer ist und den counter um 1 reduzieren, damit removeCell function works 
	  rowCounter=7;
	 if (tabelle.rows[6].cells[0].innerHTML == ' ') {
	  document.getElementById("kalender").deleteRow(6);
	  rowCounter--;
	  }
	  
    }