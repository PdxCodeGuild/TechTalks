from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import TodoItem
from django.utils import timezone
import json

def index(request):
    return render(request, 'todospaapp/index.html')

def todos(request):
    todo_items = TodoItem.objects.all()
    data = {
        'todo_items': []
    }
    for todo_item in todo_items:
        data['todo_items'].append({
            'id': todo_item.id,
            'text': todo_item.text,
            'date_created': todo_item.date_created,
            'date_completed': todo_item.date_completed
        })
    return JsonResponse(data)


def save_todo(request):
    # print(request.body)

    data = json.loads(request.body)
    todo_text = data['todo_text']

    todo_item = TodoItem(text=todo_text, date_created=timezone.now(), date_completed=None)
    todo_item.save()

    return HttpResponse('ok')
