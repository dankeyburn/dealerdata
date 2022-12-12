from django.urls import path

from .views import api_list_sales, api_show_sale, api_list_customers, api_show_customer, api_show_sales_person, api_list_sales_persons, api_list_automobile_vos

urlpatterns = [
    path("sales/", api_list_sales, name="api_list_sales"),
    path("customers/", api_list_customers, name="api_list_customers"),
    path("sales/<int:pk>/", api_show_sale, name="api_show_sale"),
    path("customers/<int:pk>/", api_show_customer, name="api_show_customer"),
    path("salespersons/<int:pk>/", api_show_sales_person , name="api_show_sales_person"),
    path("salespersons/", api_list_sales_persons, name="api_list_sales_persons"),
    path("automobilevos/", api_list_automobile_vos, name="list_automobile_vos"),
]
