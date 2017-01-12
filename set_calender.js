// we have to first set the default width of events to be 600px
var default_Width = 600;

function layOutDay(events) 
{
	for(var i = 0; i < events.length; i++)
	{		
		//Initialize the event to default values if not initialized
		set_Default_Values(events[i]);
		
		for(var j = i+1; j < events.length; j++)
		{	
			if(i == j)
			{
				continue;
			}
			
			set_Default_Values(events[j]);
		// this fuction checks is the two events collide or not, 
			add_to_collide(events[i], events[j]);  
			
		} 
	}
	//In this fuction we go over the collision hash and we alter the width, left properties of the event that collides	
	change_Ui_for_collideEvents(events);
	
	//this displays the events on the screen after we check for collision and alter the properties of the event
	display_Events(events);
	
	return events
}



function set_Default_Values(event)
{
	if(event.collision_hash == undefined)
	{
		event.collision_hash 		= new Array();
		event.num_collisions 	= 0;
		event.width 					= default_Width;
		event.left  					= 0;
		event.top   					= event.start;
		event.length   				= event.end - event.start;
		event.left_pos_final  = false;
		
		// sets the default title and description
		if(event.item == undefined)
		{
			event.item = "Sample Item";
		}
		
		if(event.location == undefined)
		{
			event.location = "Sample Location";
		}
		
	}
}

//This determines if event1 and event2 collide
function check_If_Collide(event1, event2)
{
	if( ((event2.start >= event1.start) && (event2.start < event1.end) ) ||
	    ( (event1.start >= event2.start) && (event1.start < event2.end) ) )
	{
		return true;
	}
	else
	{
		return false;
	}
}

// This function takes two events and adds each other to their collision hash tables
function add_to_collide(event1, event2)
{
	// If Events 1 and 2 Collide, here they will reference each other's ids
	if( check_If_Collide(event1, event2) )
	{				
		if(event1.collision_hash[event2.id.toString()] == undefined)
		{	
			event1.collision_hash[event2.id.toString()] = event2;
			event1.num_collisions++;
			
			event2.collision_hash[event1.id.toString()] = event1;
			event2.num_collisions++;			
		}				
	}
	
}

// Modifies the left and width properties of events which collide.
function solveCollisions(event)
{
	if(event.num_collisions >= 1)
	{	
		var key;

		// if first time the event is seen, then the left is set to zero
		if(event.left_pos_final == false)
		{
			event.left = 0;
			event.left_pos_final= true;
		}

		var offset_multiplier = 1;
			
		for (key in event.collision_hash) 
		{
			
			console.log(event.num_collisions);
			var conflicting_event 		= event.collision_hash[key];
			//to split the width equally for collided events
			new_width_for_two_events 	= default_Width / (event.num_collisions + 1);
			console.log(new_width_for_two_events);
			event.width	= new_width_for_two_events;
			conflicting_event.width  	= new_width_for_two_events;
			conflicting_event.left 		= new_width_for_two_events * (offset_multiplier++);

		}
	}
}

// Adds UI Properties width and left positions to each event of the events array after 
// assigning events' properties.
function change_Ui_for_collideEvents(events)
{	
	for(var i = 0; i < events.length; i++)
	{
		solveCollisions(events[i]);
	}	
}
