import os
from azure.storage.blob import BlobServiceClient

try:
    connect_str = os.getenv('AZURE_STORAGE_CONNECTION_STRING')

    blob_service_client = BlobServiceClient.from_connection_string(connect_str)
    container_name = str('data')
    container_client = blob_service_client.get_container_client(container_name)

    blob_list = container_client.list_blobs()
    for blob in blob_list:
        container_client.delete_blob(blob.name)

    print("\nListing remaining blobs... (should be empty)")

    blob_list = container_client.list_blobs()
    for blob in blob_list:
        print(blob.name)


except Exception as ex:
    print('Exception:')
    print(ex)