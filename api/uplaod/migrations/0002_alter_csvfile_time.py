# Generated by Django 4.2 on 2023-05-11 01:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('uplaod', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='csvfile',
            name='time',
            field=models.DateTimeField(null=True),
        ),
    ]
