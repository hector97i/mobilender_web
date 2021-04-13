from django.db import models

# Create your models here.

class Client(models.Model):
    name = models.CharField(max_length=128)
    code = models.CharField(max_length=16)
    picture = models.ImageField(blank=True)
    address = models.CharField(max_length=128)
    tier = models.CharField(max_length=7)

    def __str__(self):
        return f"{self.name} - {self.tier}"

class Supplier(models.Model):
    name = models.CharField(max_length=128)
    address = models.CharField(max_length=128)
    articles = models.ManyToManyField('Article', blank=True)

    def __str__(self):
        return f"{self.id}: {self.name}"

class Article(models.Model):
    code = models.CharField(max_length=16)
    description = models.CharField(max_length=128)
    price = models.FloatField()
    suppliers = models.ManyToManyField('Supplier', blank=True)

    def __str__(self):
        return f"ID: {self.id} - {self.description} - ${self.price} - {self.code}"

class Order(models.Model):
    id = models.IntegerField(primary_key=True)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    served_at = models.DateTimeField(blank=True, null=True)
    urgency = models.BooleanField(default=False)
    to_center = models.BooleanField()
    order_to = models.JSONField()
    articles = models.ManyToManyField(Article, through ='ArticleQuantity', related_name='OrderArticles', blank=True)

    def __str__(self):
        return f"{self.id} - {self.client} - Urgente: {self.urgency}"
class ArticleQuantity(models.Model):
    article = models.ForeignKey(Article, on_delete=models.DO_NOTHING)
    order = models.ForeignKey(Order, on_delete=models.DO_NOTHING)
    supplier = models.ForeignKey(Supplier, on_delete=models.DO_NOTHING)
    quantity = models.IntegerField()

    def __str__(self):
        return f"#{self.quantity} of {self.article} Order: {self.order}"