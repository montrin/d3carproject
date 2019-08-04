# D3 Car Project
####Messaging
With this narrative visualization, we convey the message about the fuel consumption of cars in 2017. We look at the miles per gallon attribute as well as fuel type and cylinders. We show that most of the cars aren't electric and have a medium to high fuel consumption.

####Narrative Structure
  We provide an interactive slideshow where the user starts on the market overview scene where she/he can then drill-down the
information by filtering the car makes. If she/he clicks then on a data circle, she/he gets navigated to the next scene where the fuel types are compared to each other. If the user clicks then on a data element, she gets navigated to the third scene where the chart highlights the relation between the number of cylinders and fuel consumption.
  
#####Visual Structure
Each scene has the same structure. Each scene contains a title, then below a textual annotation with general details to the slideshow and three buttons as navigation menu points.

Below the navigation, the chart and legend labels appear, and next to it is the filter area with dropdowns to drill-down information on each scene.

By moving over a data element, the user gets additional details via tooltip. If the user clicks on a data element on the first two scenes, the event coordinates the navigation to the appropriate next scene.

The legend and annotation area below the filter, are loaded dynamically, based on the selected values in the filter.

#####Scenes
######Scene 1: Market
This scene is the entry of the narrative visualization and shows the market landscape by visualizing all car makes according
to their city and highway mpg consumption. It gives the user a general overview of the market landscape. If the user is interested in specific car makes she/he can filter the data points by using the appropriate filter. The annotation field then reveals information only about the filtered data. If the user clicks on a data element, she/he gets navigated to the next scene.

######Scene 2: Gas vs. diesel vs. electro cars
This scene conveys another aspect, namely the type of fuel used and its relation to the mpg consumption. The data can be filtered by car makes and fuel type. The annotation and legend field re-loads according to the selected values. If the user clicks on a data element, she/he gets navigated to the 3rd scene.

######Scene 3: Cylinders and consumption
This scene highlights the relation between the number of cylinders and mpg consumption and highlights that fuel consumption has a relation to the number of cylinders. The user can filter by car makes and the number of cylinders.

The first scene shows an overview, and by drill-down, the user can view different aspects of the data. The ordering is chosen as it is, because of a top-down principle where we look on more general attributes first such as fuel type and then the cylinders.

#####Annotations
Each scene has its annotations, which change dynamically according to the selected values in the filter. Although they contain different data, they contain the same structure, namely header, and text content.

Every annotation appears on the same location so that the user does not get confused.

####Parameters
We use scene variables where we hold the current selection of scene. Furthermore, we work with variables for the filter to save the current selection.

####Triggers
Click and mouse event listeners ensure that if the user clicks on a navigation button, changes a filter value, or clicks on a data element, the event triggers the appropriate action. To highlight the ability to click on a data element, we change the mouse pointer that indicates a possible action. 
 

      
