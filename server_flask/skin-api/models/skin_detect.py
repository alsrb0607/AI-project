import os, cv2,itertools
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from tqdm import tqdm
from glob import glob
from PIL import Image

# pytorch libraries
import torch
from torch import optim,nn
from torch.autograd import Variable
from torch.utils.data import DataLoader,Dataset
from torchvision import models,transforms

# sklearn libraries
from sklearn.metrics import confusion_matrix
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

from models.segmentation import seg_skin

# to make the results are reproducible
np.random.seed(10)
torch.manual_seed(10)
torch.cuda.manual_seed(10)


# 모델 만든 후
device = torch.device("cpu")
model_ft = models.densenet121()
num_ftrs = model_ft.classifier.in_features
model_ft.classifier = nn.Linear(num_ftrs, 7)
input_size = 224

# 파라미터 불러오기
PATH="./models/best_metric_model_skin.pth"
device = torch.device("cpu")
class_names = ['sd1', 'sd2', 'sd3', 'sd4', 'sd5', 'sd6', 'sd7']

model_ft.load_state_dict(torch.load(PATH, map_location=device))
model_ft.eval()

# 데이터 불러오기 위한 Class
class Dataset(torch.utils.data.Dataset):
        def __init__(self, image_files, labels, transforms):
            self.image_files = image_files
            self.labels = labels
            self.transforms = transforms

        def __len__(self):
            return len(self.image_files)

        def __getitem__(self, index):
            return self.transforms(Image.open(self.image_files[index])), self.labels[index]
# i는 ALL 폴더 내의 i번째 이미지를 의미
# 폴더를 여러 개 생성하기, 폴더 하나에 이미지 하나
def skin_detect(path):
    norm_mean = (0.49139968, 0.48215827, 0.44653124)
    norm_std = (0.24703233, 0.24348505, 0.26158768)
    input_size = 224
    val_x = []
    val_y = []
    prediction = []
    for images in sorted(os.listdir(path), key = len):
        test_image = os.path.join(path, images)
        val_x.append(test_image)
        val_y.append(0)

    val_transform = transforms.Compose([transforms.Resize((input_size,input_size)), transforms.ToTensor(),
                                    transforms.Normalize(norm_mean, norm_std)])
    
    val_ds = Dataset(val_x, val_y, val_transform)

    val_loader = DataLoader(val_ds, batch_size=1, shuffle=False, num_workers=0)

    model_ft.eval()
    with torch.no_grad():
        for i, data in enumerate(val_loader):
            images, labels = data
            N = images.size(0)
            images = Variable(images).to(device)
            outputs = model_ft(images)
            pred = outputs.max(1, keepdim=True)[1]
            pred = pred.item()
            prediction.append(pred)

        diagnosis = class_names[prediction[0]]
        img_saved = seg_skin(path)
        return img_saved, diagnosis
