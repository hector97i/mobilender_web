# Generated by Django 3.2 on 2021-04-07 17:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_order_articles'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='served_at',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
