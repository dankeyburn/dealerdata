from django.shortcuts import render
from .models import Sale, SalesPerson, Customer, AutomobileVO
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from .encoders import AutomobileVOEncoder, CustomerListEncoder, SalesPersonEncoder, SalesListEncoder, CustomerDetailEncoder


@require_http_methods(["GET"])
def api_list_automobile_vos(request):
    if request.method == "GET":
        automobiles = AutomobileVO.objects.all()
        return JsonResponse(
            {"automobiles": automobiles},
            encoder=AutomobileVOEncoder,
        )

@require_http_methods(["GET", "POST"])
def api_list_sales(request, sales_person_employee_number=None):
    if request.method == "GET":
        if sales_person_employee_number is not None:
            sales = Sale.objects.filter(sales_person=sales_person_employee_number)
        else:
            sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesListEncoder,
        )
    else:
        try:
            content = json.loads(request.body)

            sales_person = content["sales_person"]
            sp = SalesPerson.objects.get(id=sales_person)
            content["sales_person"] = sp

            customer_id = content["customer"]
            customer = Customer.objects.get(id=customer_id)
            content["customer"] = customer

            vin = content["automobile"]
            auto = AutomobileVO.objects.get(vin=vin)
            content["automobile"] = auto

            price = content["price"]
            sale = Sale.objects.create(**content)
            return JsonResponse(
                sale,
                encoder=SalesListEncoder,
                safe=False,
            )

        except (SalesPerson.DoesNotExist, Customer.DoesNotExist, AutomobileVO.DoesNotExist):
            return JsonResponse(
                {"message": "invalid information"},
                status=200,
            )







@require_http_methods(["DELETE", "GET"])
def api_show_sale(request, pk):
    if request.method == "GET":
        sale = Sale.objects.get(pk=pk)
        return JsonResponse(
            {"sale": sale},
            encoder=SalesListEncoder)
    elif request.method == "DELETE":
        try:
            sale = Sale.objects.get(pk=pk)
            sale.delete()
            return JsonResponse(
                sale,
                encoder=SalesListEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerListEncoder)
    else:
        content = json.loads(request.body)
        name = content["name"]
        address = content["address"]
        phone_number = content["phone_number"]
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerListEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE"])
def api_show_customer(request, pk):
    if request.method == "GET":
        customer = Customer.objects.get(pk=pk)
        return JsonResponse(
            {"customer": customer},
            encoder=CustomerDetailEncoder)
    elif request.method == "DELETE":
        count, _ = Customer.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_list_sales_persons(request):
    if request.method == "GET":
        sales_persons = SalesPerson.objects.all()
        return JsonResponse(
            {"sales_persons": sales_persons},
            encoder=SalesPersonEncoder)
    else:
        content = json.loads(request.body)
        name = content["name"]
        employee_number = content["employee_number"]
        sales_person = SalesPerson.objects.create(**content)
        return JsonResponse(
            sales_person,
            encoder=SalesPersonEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE"])
def api_show_sales_person(request, pk):
    if request.method == "GET":
        sales_person = SalesPerson.objects.get(pk=pk)
        return JsonResponse(
            {"sales_person": sales_person},
            encoder=SalesPersonEncoder)
    elif request.method == "DELETE":
        count, _ = SalesPerson.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
