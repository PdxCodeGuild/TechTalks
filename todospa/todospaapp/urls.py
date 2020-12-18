

from django.urls import path
from . import views

app_name = 'todospaapp'

urlpatterns = [
    path('', views.index, name='index'),
    path('todos/', views.todos, name='todos'),
    path('save_todo/', views.save_todo, name='save_todo')
]


