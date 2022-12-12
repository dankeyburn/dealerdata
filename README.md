# CarCar

Team:

* Dan Keyburn - Auto Services
* Ally Haas Messimer - Auto Sales

## Design

## Service microservice

Explain your models and integration with the inventory
microservice, here.

## Sales microservice

Explain your models and integration with the inventory
microservice, here.
    In the sales microservice I have a manufacturer, vehicle, and automobile VO in order to get data from the inventory model. I also have a customer and sales person model which is unrelated to the inventory microservice. My sale model uses data from the automobileVO, customer, and sales person models. The poller polls the 8100 url for the automobile vin information that is required for my sale model. 
