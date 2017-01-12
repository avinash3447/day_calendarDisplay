function display_Events(events)
{	
	// Finds the element with id content_inner. content_inner is a div
	var content_inner_div = document.getElementById("content_inner");
	console.log(content_inner_div);
	
	for(var i = 0; i < events.length; i++)
	{
		var event = events[i];
console.log(event.width + " " +event.left + " " + event.length + ' ' + event.top );
				
			event_div = document.createElement('div'); // add a div node to the content_inner_div
			event_div.className = "event";             // add a event class for css from calender.css
			event_div.style.width = event.width + "px";
			event_div.style.left = event.left+10 + "px";//10px to add some space
			event_div.style.height = event.length + "px";
			event_div.style.top = event.top + "px";
console.log(event_div.style.width + " " +event_div.style.left + " " + event_div.style.height + ' ' +event_div.style.top);

			event_inner_div = document.createElement('div'); // div for the description of the event
			event_inner_div.className = "event_inner";


			h2 = document.createElement('h2');
			h2.innerHTML = event.item;



			p = document.createElement('p');
			p.innerHTML = event.location;

// appends this child node to the parent node event_inner_div

			event_inner_div.appendChild(h2);
			event_inner_div.appendChild(p);

// appends this child node to the parent node event_div

			event_div.appendChild(event_inner_div);

// finally appending the outer div node to the parent node #content_inner
			content_inner_div.appendChild(event_div);
	}

}
