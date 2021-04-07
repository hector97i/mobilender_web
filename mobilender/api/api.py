from .models import *
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .serializers import *

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = ClientSerializer

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = ArticleSerializer

class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = SupplierSerializer


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = OrderSerializer


class ArticleQuantityViewSet(viewsets.ModelViewSet):
    model = ArticleQuantity
    permission_classes = [
        permissions.AllowAny
    ]

    serializer_class = ArticleQuantitySerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=isinstance(request.data,list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
