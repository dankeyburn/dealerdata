# Generated by Django 4.0.3 on 2022-12-12 15:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0005_remove_serviceappointment_appointment_date_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='serviceappointment',
            name='appointment_datetime',
        ),
        migrations.AddField(
            model_name='serviceappointment',
            name='appointment_date',
            field=models.DateField(null=True),
        ),
        migrations.AddField(
            model_name='serviceappointment',
            name='appointment_time',
            field=models.TimeField(null=True),
        ),
    ]
