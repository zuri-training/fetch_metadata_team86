# Generated by Django 4.0.6 on 2022-08-06 08:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_resetpasswordsetting_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='resetpasswordsetting',
            options={'verbose_name_plural': 'Reset Password Settings'},
        ),
    ]