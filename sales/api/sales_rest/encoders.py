from common.json import ModelEncoder
from .models import Customer, SalesPerson, AutomobileVO, Sale, VehicleModelVO, ManufacturerVO


class ManufacturerVOEncoder(ModelEncoder):
    model = ManufacturerVO
    properties = [
        "name"
    ]

class VehicleModelVOEncoder(ModelEncoder):
    model = VehicleModelVO
    properties = [
        "name",
        "picture_url",
        "manufacturer"
    ]
    encoders = {
        "manufacturer": ManufacturerVOEncoder(),
    }


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "color",
        "year",
        "vin",
        "model",
    ]
    encoders = {
        "model": VehicleModelVOEncoder(),
    }


class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "name",
        "address",
        "phone_number",
    ]

class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "name",
        "address",
        "phone_number",
    ]

class SalesPersonsListEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "name",
        "employee_number",
    ]

class SalesPersonDetailEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "name",
        "employee_number",
    ]


class SalesListEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
        "automobile",
        "sales_person",
        "customer",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "sales_person": SalesPersonDetailEncoder(),
        "customer": CustomerDetailEncoder(),
    }

    # def get_extra_data(self, o):
    #     return {"sales_person": o.sales_person.name}


class SalesDetailEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
        "automobile",
        "sales_person",
        "customer",
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "sales_person": SalesPersonDetailEncoder(),
        "customer": CustomerDetailEncoder(),
    }
