from .models import CsvFile
from .serializers import CsvFileSerializer
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView,Response
import io
import pandas as pd
from django.http import JsonResponse

class CsvFileView(APIView):
  def get(self, request):
    if request.GET.get('id') is not None:
        csv_files = get_object_or_404(CsvFile,id=int(request.GET.get('id')))
        serializer = CsvFileSerializer(csv_files)
        file_obj = io.StringIO(serializer.data['data'])
        df = pd.read_csv(file_obj)
        data = {'file':serializer.data,'csv':df.to_html(index=False),'columns':df.columns.tolist()}
        response =  JsonResponse(data, safe=False)
        response['Access-Control-Allow-Origin'] = '*'
        return response
    if request.GET.get('func') is not None:
        csv_files = get_object_or_404(CsvFile,id=int(request.GET.get('id')))
        file_obj = io.StringIO(serializer.data['data'])
        df = pd.read_csv(file_obj)
        func = eval(request.GET.get('func'))
        df = func()
        data = {'file':serializer.data,'csv':df.to_html(index=False),'columns':df.columns.tolist()}
        response =  JsonResponse(data, safe=False)
        response['Access-Control-Allow-Origin'] = '*'
        return response

    else:
      csv_files = CsvFile.objects.all()
      serializer = CsvFileSerializer(csv_files, many=True)
  
    response = Response(serializer.data)
    response['Access-Control-Allow-Origin'] = '*'
    return response

  def post(self, request):
    file = request.FILES.get('file')
    content = file.read()
    csv_file_data = content
    csv_file = CsvFile(data=csv_file_data.decode('utf-8'),name=file.name)
    csv_file.save()
    response =  Response(csv_file.data)
    response['Access-Control-Allow-Origin'] = '*'
    return response

  def delete(self, request, pk):
    csv_file = get_object_or_404(CsvFile,pk=pk)
    csv_file.delete()
    response = Response("deleted")
    response['Access-Control-Allow-Origin'] = '*'
    return response

