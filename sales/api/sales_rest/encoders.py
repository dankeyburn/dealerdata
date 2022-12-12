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
        "id",
        "vin",
    ]

class CustomerListEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "name",
    ]


class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "name",
        "address",
        "phone_number",
    ]


class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "id",
        "name",
        "employee_number",
    ]



class SalesListEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "sales_person",
        "customer",
        "automobile",
        "price",
    ]
    encoders = {
        "sales_person": SalesPersonEncoder(),
        "customer": CustomerListEncoder(),
        "automobile": AutomobileVOEncoder(),
    }
