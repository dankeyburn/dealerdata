from django.contrib import admin
from .models import ManufacturerVO, VehicleModelVO, AutomobileVO, Technician, ServiceAppointment, SalesPersonVO, SaleVO

# Register your models here.
@admin.register(ManufacturerVO)
class ManufacturerVOAdmin(admin.ModelAdmin):
    pass

@admin.register(VehicleModelVO)
class VehicleModelVOAdmin(admin.ModelAdmin):
    pass


@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    pass


@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    pass

@admin.register(ServiceAppointment)
class ServiceAppointmentAdmin(admin.ModelAdmin):
    pass

@admin.register(SalesPersonVO)
class SalesPersonVOAdmin(admin.ModelAdmin):
    pass

@admin.register(SaleVO)
class SaleVOAdmin(admin.ModelAdmin):
    pass
