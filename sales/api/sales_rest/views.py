from django.shortcuts import render
from .models import Sale, SalesPerson, Customer, AutomobileVO
from django.views.decorators.http import require_http_methods
# from .encoders import SalesPersonEncoder, SalesListEncoder, CustomerListEncoder, CustomerDetailEncoder, AutomobileVOEncoder, SalesDetailEncoder
from django.http import JsonResponse
import json

def api_list_sales(request):
    response = []
    sales = Sale.objects.all()
    for sale in sales:
        response.append(
            {
                "price": sale.price,
                "automobile": sale.automobile.vin,
                "sales_person": {
                    "name": sale.sales_person.name,
                    "employee_number": sale.sales_person.employee_number,
                },
                "customer": {
                    "name": sale.customer.name,
                    "address": sale.customer.address,
                    "phone_number": sale.customer.phone_number,
                },
            }
        )
    return JsonResponse({"sales": response})


def api_show_sale(request, pk):
    sale = Sale.objects.get(pk=pk)
    return JsonResponse(
    {
        "price": sale.price,
        "automobile": {
            "color": sale.automobile.color,
            "year": sale.automobile.year,
            "vin": sale.automobile.vin,
            "model": {
                "name": sale.automobile.model.name,
                "picturl_url": sale.automobile.model.picture_url,
                "manufacturer": {
                    "name": sale.automobile.model.manufacturer.name,
                },
            },
        },
        "sales_person": sale.sales_person.name,
        "customer": sale.customer.name,
    }
    )


def api_list_customers(request):
    response = []
    customers = Customer.objects.all()
    for customer in customers:
        response.append(
            {
                "name": customer.name,
                "address": customer.address,
                "phone_number": customer.phone_number,
            }
        )
    return JsonResponse({"customers": response})


def api_show_customer(request, pk):
    customer = Customer.objects.get(pk=pk)
    return JsonResponse(
    {
        "name": customer.name,
        "address": customer.address,
        "phone_number": customer.phone_number,
    }
    )


def api_list_sales_persons(request):
    response = []
    sales_persons = SalesPerson.objects.all()
    for sales_person in sales_persons:
        response.append(
            {
                "name": sales_person.name,
                "employee_number": sales_person.employee_number,
            }
        )
    return JsonResponse({"sales_persons": response})


def api_show_sales_person(request, pk):
    sales_person = SalesPerson.objects.get(pk=pk)
    return JsonResponse(
    {
        "name": sales_person.name,
        "employee_number": sales_person.employee_number,
    }
    )

# @require_http_methods(["GET", "POST"])
# def api_list_sales(request):
#     if request.method == "GET":
#         sales = Sale.objects.all()
#         return JsonResponse(
#             {"sales": sales},
#             encoder=SalesListEncoder
#         )
#     else:
#         try:
#             content = json.loads(request.body)
#             sales_person = content["sales_person"]
#             sp = SalesPerson.objects.get(employee_number=sales_person)
#             content["sales_person"] = sp

#             customer_id = content["customer"]
#             customer = Customer.objects.get(id=customer_id)
#             content["customer"] = customer
#             vin = content["automobile"]
#             auto = AutomobileVO.objects.get(vin=vin)
#             content["automobile"] = auto
#             price = content["price"]
#             console.log(price)
#             sale = Sale.objects.create(**content)
#             return JsonResponse(
#                 sale,
#                 encoder=SalesListEncoder,
#                 safe=False,
#             )


#         except (SalesPerson.DoesNotExist, Customer.DoesNotExist, AutomobileVO.DoesNotExist):
#             return JsonResponse(
#                 {"message": "invalid information"},
#                 status=200,
#             )



# @require_http_methods(["DELETE", "GET"])
# def api_show_sale(request, pk):
#     if request.method == "GET":
#         sale = Sale.objects.get(id=pk)
#         return JsonResponse(
#             sale,
#             encoder=SalesDetainEncoder,
#             safe=False,
#         )
#     else:
#         count, _ = Sale.objects.filter(id=pk).delete()
#         return JsonResponse({"deleted": count > 0})


# @require_http_methods(["GET", "POST"])
# def list_customers(request):
#     if request.method == "GET":
#         customers = Customer.objects.all()
#         return JsonResponse(
#             {"customers": customers},
#             encoder=CustomerListEncoder,
#             safe=False,
#         )
#     else:
#         content = json.loads(request.body)
#         name = content["name"]
#         address = content["address"]
#         phone_number = content["phone_number"]
#         customer = Customer.objects.create(**content)
#         return JsonResponse(
#             customer,
#             encoder=CustomerDetailEncoder,
#             safe=False,
#         )


# @require_http_methods(["GET"])
# def show_customer(request, id):
#     if request.method == "GET":
#         customer = Customer.objects.get(id=id)
#         return JsonResponse(
#             customer,
#             encoder=CustomerDetailEncoder,
#             safe=False,
#         )


# @require_http_methods(["GET", "POST"])
# def list_sales_persons(request):
#     if request.method == "GET":
#         sales_persons = SalesPerson.objects.all()
#         return JsonResponse(
#             {"sales_persons": sales_persons},
#             encoder=SalesPersonEncoder,
#         )
#     else:
#         content = json.loads(request.body)
#         name = content["name"]
#         employee_number = content["employee_number"]
#         sales_person = SalesPerson.objects.create(**content)
#         return JsonResponse(
#             sales_person,
#             encoder=SalesPersonEncoder,
#             safe=False
#         )

# @require_http_methods(["GET"])
# def show_sales_person(request, id):
#     if request.method == "GET":
#         sales_person = SalesPerson.objects.get(id=id)
#         return JsonResponse(
#             sales_person,
#             encoder=SalesPersonEncoder,
#             safe=False,
#         )
