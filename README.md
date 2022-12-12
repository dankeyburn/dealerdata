# CarCar

Team:

- Dan Keyburn - Auto Services
- Ally Haas Messimer - Auto Sales

## Design

## Service microservice

To handle the requirements for the services portion of the project, I started by creating two models, Technician and ServiceAppointment. ServiceAppointment would store relevant variables like vehicle_vin, owner, etc to include a technician ForeignKey associated with the Technician model (which contains a name and employee_number).
I then created virtual objects for the models I would be accessing in services from inventory (e.g. VehicleModel => VehicleModelVO) and populated their data with async fetch calls to their relevant path in the inventory API (e.g. localhost:8100/api/automobiles). This allowed functionality for my services API that depended on data fetched from the inventory API.

## Sales microservice

In the sales microservice I have a manufacturer, vehicle, and automobile VO in order to get data from the inventory model. I also have a customer and sales person model which is unrelated to the inventory microservice. My sale model uses data from the automobileVO, customer, and sales person models. The poller polls the 8100 url for the automobile vin information that is required for my sale model.
