#!/usr/bin/env python
# coding: utf-8

# In[1]:


import json 
import time
import math
import uuid
from pathlib import Path
from xml.etree.ElementTree import ElementTree


# In[2]:


def isContainedInString(array, text):
    for a in array:
        if a in text:
            return True
    return False


# In[4]:


mydoc = ElementTree(file='./AipsDownload_20210925/AipsDownload_20210924.xml')
search_index = [];
for i, e in enumerate(mydoc.findall('.//medicalInformation[@lang="de"]')):
    uuid_for_item = str(uuid.uuid1())

    blob_item = {
        'id': uuid_for_item,
        'name': getattr(e.find('title'), 'text', None),
        'lang': getattr(e, 'lang', None),
        'substance': getattr(e.find('substances'), 'text', None),
        'status': 'active',
        'status_type': 'green',
        'authHolder': getattr(e.find('authHolder'), 'text', None),
        'atcCode': getattr(e.find('atcCode'), 'text', None),
        'style': getattr(e.find('style'), 'text', None),
        'content': getattr(e.find('content'), 'text', None),
        'last_update': math.floor(time.time()),
    }

    search_item = {
        'id': uuid_for_item,
        'name': getattr(e.find('title'), 'text', None),
        'substance': getattr(e.find('substances'), 'text', None),
        'atc': getattr(e.find('atcCode'), 'text', None),
    }

    file_path = f"./information/{uuid_for_item}.json"
    blob_json = json.dumps(blob_item, indent=4)
    print(blob_json, file=open(file_path, 'w'))

    search_index.append(search_item)
    print(uuid_for_item, blob_item['name'])
    
search_json = json.dumps(search_index, indent=4)
print(search_json, file=open('search_index.json', 'w'))


# In[ ]:




