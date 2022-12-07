from django.contrib import admin

from .models import ManufacturerVO, VehicleModelVO, AutomobileVO, Customer, SalesPerson, Sale


@admin.register(ManufacturerVO)
class ManufacturerVO(admin.ModelAdmin):
    pass

@admin.register(VehicleModelVO)
class VehicleModelVO(admin.ModelAdmin):
    pass

@admin.register(AutomobileVO)
class AutomobileVO(admin.ModelAdmin):
    pass

@admin.register(Customer)
class Customer(admin.ModelAdmin):
    pass

@admin.register(SalesPerson)
class SalesPerson(admin.ModelAdmin):
    pass

@admin.register(Sale)
class Sale(admin.ModelAdmin):
    pass
