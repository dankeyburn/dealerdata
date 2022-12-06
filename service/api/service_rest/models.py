from django.db import models
from django.urls import reverse
from .models import Technician


class ManufacturerVO(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def get_api_url(self):
        return reverse("api_manufacturer", kwargs={"pk": self.id})

class VehicleModelVO(models.Model):
    name = models.CharField(max_length=100)
    picture_url = models.URLField()

    manufacturer = models.ForeignKey(
        ManufacturerVO,
        related_name="models",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("api_vehicle_model", kwargs={"pk": self.id})

class AutomobileVO(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)

    model = models.ForeignKey(
        VehicleModelVO,
        related_name="automobiles",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("api_vehicle_model", kwargs={"pk": self.id})

class CustomerVO(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone_number = models.IntegerField()

class ServiceAppointment(models.Model):
    vehicle_vin = models.CharField(max_length=17)
    appointment_datetime = models.DateTimeField()
    appointment_reason = models.TextField()
    customer_name = models.ForeignKey(
        CustomerVO,
        related_name="customers",
        on_delete=models.CASCADE,
    )
    assigned_technician = models.ForeignKey(
        Technician,
        related_name="technicians",
        on_delete=models.CASCADE,
    )

class Technician(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.CharFIeld(max_length=50)
