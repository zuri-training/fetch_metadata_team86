
from django.db import models
from django.contrib.auth.models import User
# Create your models here.
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from rest_framework.generics import GenericAPIView


from django.contrib.auth.models import AbstractUser

from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)
        Token.objects.create(user=instance)


class UserProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    # email = models.EmailField(max_length=254, unique=True, null=True, blank=True)
    user_profile_pics = models.ImageField(
        upload_to="profile_images/", blank=True)
    user_profile_bio = models.TextField(null=True, blank=True)

    def __str__(self) -> str:
        return f"{self.user.username}'s profile".__str__()

class ResetPasswordSetting(models.Model):
    confirm_password_url = models.URLField(max_length=500)

    class Meta:
        verbose_name_plural = 'Reset Password Settings'


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    
    try:
        confirm_password_url = ResetPasswordSetting.objects.last().confirm_password_url
        email_plaintext_message = f"You are recieving this message because you clicked on forgot password,\
            If this was not you please kindly report it to us pycodet1@gmail.com\nKindly copy the token and click \
            on the PASSWORD RESET link below and input your token and New Password.\n\n\nTOKEN: {reset_password_token.key}\nPASSWORD RESET LINK: {confirm_password_url}"

        send_mail(
            # title:
            "Password Reset for {title}".format(title="MetaFetch"),
            # message:
            email_plaintext_message,
            # from:
            "pycodet1@gmail.com",
            # to:
            [reset_password_token.user.email]
        )

    except Exception as e:
        email_plaintext_message = f"You are recieving this message because you clicked on forgot password,\
            If this was not you please kindly report it to us pycodet1@gmail.com\nKindly copy the token and send us an \
                email requesting for the reset page link. \n\n\nTOKEN: {reset_password_token.key}"

        send_mail(
            # title:
            "Password Reset for {title}".format(title="MetaFetch"),
            # message:
            email_plaintext_message,
            # from:
            "pycodet1@gmail.com",
            # to:
            [reset_password_token.user.email]
        )

        print(e)