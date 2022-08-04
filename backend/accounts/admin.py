from django.contrib import admin
from .models import UserProfile, CustomUser, ResetPasswordSetting
# Register your models here.


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("user",)


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ("username", "email", "first_name",
                    "last_name", "last_login", "is_staff")


@admin.register(ResetPasswordSetting)
class ResetPasswordSettingAdmin(admin.ModelAdmin):
    list_display = ("confirm_password_url",)
