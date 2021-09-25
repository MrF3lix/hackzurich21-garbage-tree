import os
from pathlib import Path
from azure.storage.blob import BlobServiceClient

try:
    connect_str = os.getenv('AZURE_STORAGE_CONNECTION_STRING')

    blob_service_client = BlobServiceClient.from_connection_string(connect_str)
    container_name = str('data')
    container_client = blob_service_client.get_container_client(container_name)

    print("\nUpload blob")

    information_path = Path('./information')
    for SOURCE_FILE in sorted(information_path.glob('*.json')):
        print(SOURCE_FILE)
        with open(SOURCE_FILE, "rb") as data:
            container_client.upload_blob(data=data, name=SOURCE_FILE.name)

    print("\nListing blobs...")

    # List the blobs in the container
    blob_list = container_client.list_blobs()
    for blob in blob_list:
        print(blob.name)


except Exception as ex:
    print('Exception:')
    print(ex)