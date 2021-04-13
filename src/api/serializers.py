from rest_framework import serializers
from api.models import *

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'

class ArticleSerializer(serializers.ModelSerializer):

    suppliers = SupplierSerializer(many=True)

    class Meta:
        model = Article
        fields = '__all__'
class ArticleQuantitySerializer(serializers.ModelSerializer):

    article = ArticleSerializer()
    supplier = SupplierSerializer()
    class Meta:
        model = ArticleQuantity
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):

    client = ClientSerializer()
    class Meta:
        model = Order
        exclude = ['articles', ]

    # def create(self, validated_data):

    #     order = Order(id=validated_data['id'],
    #                     client = validated_data['client'],
    #                     served_at = validated_data['served_at'],
    #                     urgency = validated_data['urgency'],
    #                     to_center = validated_data['to_center'],
    #                     order_to = validated_data['order_to'],
    #                     )
        
    #     order.save()
        
    #     for a in dict(validated_data['articles']):
            
    #         articleElement = ArticleQuantity(article = a['article'],
    #                                     order = order,
    #                                     quantity = a['quantity'])

    #         articleElement.save()
        
    #     try:
    #         return order
    #     except AttributeError as e:
    #         print(e)
        