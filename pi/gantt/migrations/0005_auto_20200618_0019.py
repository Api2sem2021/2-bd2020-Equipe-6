# Generated by Django 3.0.7 on 2020-06-18 00:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gantt', '0004_auto_20200618_0005'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tb_pes_trf',
            name='id',
        ),
        migrations.AddField(
            model_name='tb_pes_trf',
            name='pes_trf_id',
            field=models.IntegerField(default=1, primary_key=True, serialize=False, verbose_name='id'),
            preserve_default=False,
        ),
    ]
