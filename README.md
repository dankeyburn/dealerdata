# CarCar

Team:

- Dan Keyburn - Auto Services
- Ally Haas Messimer - Auto Sales

## Design

## Service microservice

I created virtual objects for the models I would be accessing in services from inventory (Automobile, Manufacturer, and VehicleModel => AutomobileVO, ManufacturerVO, VehicleModelVO) and populated their data with async fetch calls to their relevant path in the inventory API (e.g. localhost:8100/api/automobiles) This allowed functionality for my services API that depended on data fetched from the inventory API.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
