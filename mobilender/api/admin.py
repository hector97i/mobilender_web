from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Client)
admin.site.register(Article)
admin.site.register(Supplier)
admin.site.register(Order)
admin.site.register(ArticleQuantity)
