# Generated by Django 4.2 on 2023-05-10 23:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CsvFile',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('data', models.TextField()),
                ('time', models.DateTimeField()),
            ],
        ),
    ]
