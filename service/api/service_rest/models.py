from django.db import models
from django import forms
from django.urls import reverse
import json


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

class Technician(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.id}. {self.name}"

class ServiceAppointment(models.Model):
    vehicle_vin = models.CharField(max_length=17)
    appointment_date = models.DateField(null=True)
    appointment_time = models.TimeField(null=True)
    appointment_reason = models.TextField()
    appointment_finish = models.BooleanField(default=False)
    owner = models.CharField(max_length=200)
    is_vip = models.BooleanField(default=False)
    technician = models.ForeignKey(
        Technician,
        related_name="technicians",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return f"{self.id}, {self.vehicle_vin}"

    def get_api_url(self):
        return reverse("list_appointments", kwargs={"vin": self.id})
