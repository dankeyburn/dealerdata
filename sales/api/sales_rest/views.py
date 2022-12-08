from django.shortcuts import render
from .models import Sale, SalesPerson, Customer, AutomobileVO
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from .encoders import AutomobileVOEncoder, CustomerDetailEncoder, CustomerListEncoder, SalesPersonDetailEncoder, SalesPersonsListEncoder, SalesListEncoder, SalesDetailEncoder

def api_list_sales(request):
    sales = Sale.objects.all()
    return JsonResponse(
        {"sales": sales},
        encoder=SalesListEncoder)


def api_show_sale(request, pk):
    sale = Sale.objects.get(pk=pk)
    return JsonResponse(
        {"sale": sale},
        encoder=SalesDetailEncoder)


def api_list_customers(request):
    customers = Customer.objects.all()
    return JsonResponse(
        {"customers": customers},
        encoder=CustomerListEncoder)


def api_show_customer(request, pk):
    customer = Customer.objects.get(pk=pk)
    return JsonResponse(
        {"customer": customer},
        encoder=CustomerDetailEncoder)


def api_list_sales_persons(request):
    sales_persons = SalesPerson.objects.all()
    return JsonResponse(
        {"sales_persons": sales_persons},
        encoder=SalesPersonsListEncoder)


def api_show_sales_person(request, pk):
    sales_person = SalesPerson.objects.get(pk=pk)
    return JsonResponse(
    {"sales_person": sales_person},
    encoder=SalesPersonDetailEncoder)

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
