from django.db import models

# Create your models here.

class Client(models.Model):
    name = models.CharField(max_length=128)
    code = models.CharField(max_length=16)
    picture = models.ImageField()
    address = models.CharField(max_length=128)
    tier = models.CharField(max_length=7)

class Supplier(models.Model):
    name = models.CharField(max_length=128)
    address = models.CharField(max_length=128)
    articles = models.ManyToManyField(Article)

class Article(models.Model):
    code = models.CharField(max_length=16)
    description = models.CharField(max_length=128)
    price = models.FloatField()
    suppliers = models.ManyToManyField(Supplier)

class Order(models.Model):
    id = models.IntegerField(primary_key=True)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    served_at = models.DateTimeField()
    urgency = models.BooleanField(default=False)
    to_center = models.BooleanField()
    order_to = models.JSONField()
    articles = models.ManyToManyField(Article, through='ArticleQuantity', related_name='OrderArticles')

class ArticleQuantity(models.Model):
    article = models.ForeignKey(Article)
    order = models.ForeignKey(Order)
    quantity = models.IntegerField()

