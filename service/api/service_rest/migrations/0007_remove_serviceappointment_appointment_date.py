# Generated by Django 4.0.3 on 2022-12-12 16:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0006_remove_serviceappointment_appointment_datetime_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='serviceappointment',
            name='appointment_date',
        ),
    ]
