# from common.json import ModelEncoder
# from .models import Customer, SalesPerson, AutomobileVO, Sale

# class CustomerListEncoder(ModelEncoder):
#     model = Customer
#     properties = [
#         "id",
#         "name",
#     ]


# class CustomerDetailEncoder(ModelEncoder):
#     model = Customer
#     properties = [
#         "id",
#         "name",
#         "address",
#         "phone_number",
#     ]


# class SalesPersonEncoder(ModelEncoder):
#     model = SalesPerson
#     properties = [
#         "name",
#         "employee_number",
#     ]


# class AutomobileVOEncoder(ModelEncoder):
#     model = AutomobileVO
#     properties = ["vin"]


# class SalesListEncoder(ModelEncoder):
#     model = Sale
#     properties = [
#         "price",
#         "sales_person",
#         "customer",
#         "automobile",
#     ]
#     encoders = {
#         "sales_person": SalesPersonEncoder(),
#         "customer": CustomerDetailEncoder(),
#         "automobile": AutomobileVOEncoder(),
#     }

#     def get_extra_data(self, o):
#         return {"sales_person": o.sales_person.name}


# class SalesDetailEncoder(ModelEncoder):
#     model = Sale
#     properties = [
#         "price",
#         "sales_person",
#         "customer",
#         "automobile",
#     ]
#     encoders = {
#         "sales_person": SalesPersonEncoder(),
#         "customer": CustomerDetailEncoder(),
#         "automobile": AutomobileVOEncoder(),
#     }
