from django.urls import path

from .views import (
    create_technician,
)

urlpatterns = [
    path(
        "technician/",
        create_technician,
        name="create_technician",
    ),
]
