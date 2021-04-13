from rest_framework import routers
from django.urls import path
from .api import *

router = routers.DefaultRouter()

router.register('clientes', ClientViewSet, 'clients')
router.register('articulos', ArticleViewSet, 'articles')
router.register('proveedores', SupplierViewSet, 'suppliers')
router.register('ordenes', GetOrderViewSet, 'orders')
router.register('ordenes/articulos/agregar', ArticleQuantityViewSet, 'add_articles_to_order')

urlpatterns = [
    path('ordenes/<int:id>/articulos', retrieve_order_articles, name = "retrieve_order_articles"),
]

urlpatterns += router.urls