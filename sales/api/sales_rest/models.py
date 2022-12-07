from django.db import models
from django.urls import reverse

class ManufacturerVO(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return f"{self.name}, {self.id}"

class VehicleModelVO(models.Model):
    name = models.CharField(max_length=100)
    picture_url = models.URLField()

    manufacturer = models.ForeignKey(
        ManufacturerVO,
        related_name="models",
        on_delete=models.CASCADE,
    )

   # def __str__(self):
       # return f"{self.name}, {self.id}"

class AutomobileVO(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)
    model = models.ForeignKey(
        VehicleModelVO,
        related_name="automobiles",
        on_delete=models.CASCADE,
    )
    import_href = models.CharField(max_length=200,unique = True)

    def __str__(self):
        return f"{self.vin}, {self.id}"


class Customer(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=300)
    phone_number = models.CharField(max_length=20)
    def __str__(self):
        return f"{self.id}, {self.name}"

class SalesPerson(models.Model):
    name = models.CharField(max_length=100)
    employee_number = models.IntegerField()

    def __str__(self):
        return f"{self.id}, {self.name}"


class Sale(models.Model):
    price = models.CharField(max_length=20)
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sale",
        on_delete=models.CASCADE,
    )
    sales_person = models.ForeignKey(
        SalesPerson,
        related_name="sale",
        on_delete=models.CASCADE,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sale",
        on_delete=models.CASCADE,
    )

