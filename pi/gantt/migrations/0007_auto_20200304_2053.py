# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2020-03-04 23:53
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('gantt', '0006_auto_20200304_2052'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='tbdevtrf',
            unique_together=set([]),
        ),
        migrations.RemoveField(
            model_name='tbdevtrf',
            name='fk_dev_id',
        ),
        migrations.RemoveField(
            model_name='tbdevtrf',
            name='fk_trf_id',
        ),
        migrations.DeleteModel(
            name='tbDevTrf',
        ),
    ]