from django.shortcuts import render
from .models import Sale, SalesPerson, Customer, AutomobileVO
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from django.http import JsonResponse
import json


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
        "name",
        "employee_number",
    ]


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin"]


class SalesListEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
        "sales_person",
        "customer",
        "automobile",
    ]
    encoders = {
        "sales_person": SalesPersonEncoder(),
        "customer": CustomerDetailEncoder(),
        "automobile": AutomobileVOEncoder(),
    }

    def get_extra_data(self, o):
        return {"sales_person": o.sales_person.name}


class SalesDetainEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
        "sales_person",
        "customer",
        "automobile",
    ]
    encoders = {
        "sales_person": SalesPersonEncoder(),
        "customer": CustomerDetailEncoder(),
        "automobile": AutomobileVOEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesListEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            sales_person = content["sales_person"]
            sp = SalesPerson.objects.get(employee_number=sales_person)
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
        sale = Sale.objects.get(id=pk)
        return JsonResponse(
            sale,
            encoder=SalesDetainEncoder,
            safe=False,
        )
    else:
        count, _ = Sale.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerListEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        name = content["name"]
        address = content["address"]
        phone_number = content["phone_number"]
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET"])
def show_customer(request, id):
    if request.method == "GET":
        customer = Customer.objects.get(id=id)
        return JsonResponse(
            customer,
            encoder=CustomerDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET", "POST"])
def list_sales_persons(request):
    if request.method == "GET":
        sales_persons = SalesPerson.objects.all()
        return JsonResponse(
            {"sales_persons": sales_persons},
            encoder=SalesPersonEncoder,
        )
    else:
        content = json.loads(request.body)
        name = content["name"]
        employee_number = content["employee_number"]
        sales_person = SalesPerson.objects.create(**content)
        return JsonResponse(
            sales_person,
            encoder=SalesPersonEncoder,
            safe=False
        )

@require_http_methods(["GET"])
def show_sales_person(request, id):
    if request.method == "GET":
        sales_person = SalesPerson.objects.get(id=id)
        return JsonResponse(
            sales_person,
            encoder=SalesPersonEncoder,
            safe=False,
        )
