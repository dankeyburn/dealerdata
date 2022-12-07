from django.urls import path

from .views import api_list_sales, api_show_sale, show_customer, list_customers, list_sales_persons, show_sales_person

urlpatterns = [
    path("sales/", api_list_sales, name="api_create_sales"),
    path("customers/", list_customers, name="list_customers"),
    path("sales/<int:pk>/", api_show_sale, name="api_show_sale"),
    path("salespersons/", list_sales_persons, name="list_sales_persons"),
    path("customers/<int:id>/", show_customer, name="show_customer"),
    path("salespersons/<int:id>/", show_sales_person , name="show_sales_person"),
]
