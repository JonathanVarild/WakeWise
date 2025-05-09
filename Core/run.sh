#!/bin/bash
cd /var/www/Wakewise/Core
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
sudo myenv/bin/python3 core.py