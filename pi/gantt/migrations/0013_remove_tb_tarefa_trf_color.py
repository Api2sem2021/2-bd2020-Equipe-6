# Generated by Django 3.0.7 on 2020-07-09 01:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gantt', '0012_merge_20200628_1952'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tb_tarefa',
            name='trf_color',
        ),
    ]
