from rest_framework import routers
from .api import *

router = routers.DefaultRouter()

router.register('clientes', ClientViewSet, 'clients')
router.register('articulos', ArticleViewSet, 'articles')
router.register('proveedores', SupplierViewSet, 'suppliers')
router.register('ordenes', GetOrderViewSet, 'orders')
router.register('ordenes/articulos/agregar', ArticleQuantityViewSet, 'add_articles_to_order')

urlpatterns = router.urls