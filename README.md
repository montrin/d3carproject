# d3carproject
####Messaging
With this narrative visualization we convey what car makes work on ecological cars regarding miles per gallon
consumption and electric car models. We show that most of the car makes did not provide ecological cars in their sortiment in 2017
and also convey that cars with less cylinders reach more miles per gallon and thus are ecologicaly better suited.

####Narrative Structure
  We provide an interactive slideshow where the user starts on the market overview scene where he/she can then drill-down 
  information by filtering the car makes. If she/he clicks then on a data circle, she/he gets to the next scene where 
  the average consumption in relation to the number of cylinders. If the user clicks then on a data points he/she gets
  navigated to the third scene where we compare diesel and gasoline motors.
  
#####Visual Structure
Each scene has the same structure. It contains a textual annotation with details to the scene below the title of the 
narrative visualization. Three buttons contain the navigation points for the scenes and are visually styled when active
to indicate the user on which scene he/she is.
Below the chart and legend labels appear and next to it are the filter area with dropdowns to drill-down on each scene.
By moving the mouse over details appear in a tooltip and if the user clicks on a data point he/she moves to the next scene,
to get insights to other aspects. Below the filter area appears a dynamically loaded annotation field that shows 
specific details according to the scenes and selected filters.

#####Scenes
######Market Overview
This scene is the entry of the narrative visualization and shows the market landscape by visualizing all car makes according
to their mpg consumption in a city and on the highway. It gives the user a general overview. If the user is interested in 
specific car makes he/she has the ability to filter the data points which reveals better how many cars the car make provides.

######Cylinder Consumption
This scene highlights the correlation between number of cylinders and mpg consumption and highlights that only a few cars
were electric in 2017 but that the consumption has a relation to th number of cylinders and that only a few of the car makes
have low numbered cylinder cars on the market. The user has the possibility to filter by car makes and number of cylinders
to see what car makes are "high consumers" or "low consumers". 
 
######Diesel vs. Gas
This scene conveys another aspect, namely the type of fuel used. We've seen that only a few cars are electric. This scene 
reveals that most of them drive with gasoline and that the diesel cars have a lower average consumption, but aren't comparabale
as the number of data points are much lower than the ones with gas.


The scenes start with an overview and highlight on each scene other details to understand what factors influence the consumption.

#####Annotations
Each scene has its own annotations. The first one appears under the header and explains what the scene visualizes. The 
second annotation conveys more details about the selection and changes dynamically according to the filter selection.

Every annotation appears on the same location so that the user does not get confused.

####Parameters
####Triggers
 

      