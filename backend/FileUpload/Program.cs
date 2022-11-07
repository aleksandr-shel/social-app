// See https://aka.ms/new-console-template for more information
using Azure.Storage.Blobs;
var blobStorageConnectionString = "";

var blobStorageContainerName = "fileupload";

var container = new BlobContainerClient(blobStorageConnectionString, blobStorageContainerName);

var blob = container.GetBlobClient("meme about me_hih.jpeg");

var stream = File.OpenRead("meme about me.jpeg");

await blob.UploadAsync(stream);