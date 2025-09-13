'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ReferenceDot } from 'recharts';

// --- DATA CONSTANT ---
// This is the full dataset for the Amana Fundraising prototype.
const amanaData = {
  "message": "Amana Fundraising causes data retrieved successfully",
  "company_info": {
    "name": "Amana Fundraising",
    "founded": "2020",
    "headquarters": "Amman, Jordan",
    "industry": "Non-Profit Fundraising",
    "description": "Leading fundraising platform connecting donors with impactful causes across the Middle East, specializing in education, agriculture, and small business initiatives that create lasting change in communities."
  },
  "fundraising_stats": {
    "total_causes": 8,
    "active_causes": 7,
    "total_raised": 706640,
    "total_goal": 970000,
    "average_completion_rate": 74,
    "top_category": "Education",
    "total_donors": 359,
    "average_donation": 1918
  },
  "causes": [
    {
      "id": 1,
      "title": "Digital Classroom Initiative for Gaza Schools",
      "category": "Education",
      "status": "Active",
      "urgency_level": "High",
      "short_description": "Providing laptops, tablets, and internet connectivity to 500 students in Gaza to ensure continuity of education despite ongoing challenges.",
      "detailed_description": "The Digital Classroom Initiative aims to bridge the digital divide for Palestinian students in Gaza by providing essential technology and internet access. With over 70% of schools lacking adequate digital infrastructure, students are falling behind in essential 21st-century skills. This initiative will provide 300 laptops, 200 tablets, portable internet hotspots, and teacher training programs to serve 500 students across 10 schools in Gaza. The project includes a sustainability component with local technical support and maintenance training to ensure long-term success.",
      "image_url": "/photos/student.jpg",
      "location": {
        "city": "Gaza",
        "country": "Palestine",
        "region": "Middle East",
        "latitude": 31.3547,
        "longitude": 34.3088
      },
      "metrics": {
        "goal_amount": 75000,
        "raised_amount": 52340,
        "percentage_funded": 70,
        "donor_count": 35,
        "average_donation": 1495,
        "days_remaining": 32,
        "days_active": 333
      },
      "contact": {
        "organization": "Palestinian Education Foundation",
        "coordinator": "Dr. Layla Mansour",
        "email": "layla.mansour@paled.org",
        "phone": "+970-8-123-4567"
      },
      "donors": [
        {
          "id": 10,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 1909,
          "date": "2025-09-12",
          "is_anonymous": true,
          "location": {
            "city": "Aqaba",
            "country": "UAE"
          }
        },
        {
          "id": 33,
          "name": "Gaza Relief Network",
          "type": "Individual",
          "amount": 477,
          "date": "2025-09-10",
          "is_anonymous": false,
          "location": {
            "city": "Ramallah",
            "country": "Jordan"
          },
          "message": "Small businesses are the backbone of our community."
        },
        {
          "id": 32,
          "name": "Zaid Foundation",
          "type": "Individual",
          "amount": 266,
          "date": "2025-09-08",
          "is_anonymous": false,
          "location": {
            "city": "Nablus",
            "country": "UAE"
          }
        },
        {
          "id": 4,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 5505,
          "date": "2025-09-07",
          "is_anonymous": true,
          "location": {
            "city": "Amman",
            "country": "Egypt"
          }
        },
        {
          "id": 27,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 508,
          "date": "2025-09-04",
          "is_anonymous": true,
          "location": {
            "city": "Aqaba",
            "country": "Jordan"
          }
        },
        {
          "id": 9,
          "name": "Jordan Telecom Group",
          "type": "Corporate",
          "amount": 3355,
          "date": "2025-09-03",
          "is_anonymous": false,
          "location": {
            "city": "Gaza",
            "country": "Lebanon"
          }
        },
        {
          "id": 23,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 5510,
          "date": "2025-08-29",
          "is_anonymous": true,
          "location": {
            "city": "Zarqa",
            "country": "Saudi Arabia"
          }
        },
        {
          "id": 13,
          "name": "Desert Rose Industries",
          "type": "Corporate",
          "amount": 2398,
          "date": "2025-08-28",
          "is_anonymous": false,
          "location": {
            "city": "Alexandria",
            "country": "Egypt"
          },
          "message": "Supporting our farmers means securing our future."
        },
        {
          "id": 21,
          "name": "Palestinian Heritage Society",
          "type": "Individual",
          "amount": 58,
          "date": "2025-08-27",
          "is_anonymous": false,
          "location": {
            "city": "Gaza",
            "country": "Egypt"
          },
          "message": "Investing in education is investing in tomorrow."
        },
        {
          "id": 31,
          "name": "Gaza Relief Network",
          "type": "Individual",
          "amount": 236,
          "date": "2025-08-27",
          "is_anonymous": false,
          "location": {
            "city": "Irbid",
            "country": "UAE"
          }
        },
        {
          "id": 28,
          "name": "Jordan Telecom Group",
          "type": "Corporate",
          "amount": 4777,
          "date": "2025-08-26",
          "is_anonymous": false,
          "location": {
            "city": "Hebron",
            "country": "Saudi Arabia"
          },
          "message": "May this contribution help build a better future."
        },
        {
          "id": 14,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 122,
          "date": "2025-08-24",
          "is_anonymous": true,
          "location": {
            "city": "Ramallah",
            "country": "Lebanon"
          },
          "message": "Small businesses are the backbone of our community."
        },
        {
          "id": 11,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 189,
          "date": "2025-08-21",
          "is_anonymous": false,
          "location": {
            "city": "Zarqa",
            "country": "Lebanon"
          },
          "message": "Every child deserves access to quality education."
        },
        {
          "id": 20,
          "name": "Aramex Foundation",
          "type": "Corporate",
          "amount": 5020,
          "date": "2025-08-20",
          "is_anonymous": false,
          "location": {
            "city": "Nablus",
            "country": "UAE"
          }
        },
        {
          "id": 24,
          "name": "Nour Farouk",
          "type": "Individual",
          "amount": 241,
          "date": "2025-08-19",
          "is_anonymous": false,
          "location": {
            "city": "Amman",
            "country": "Egypt"
          }
        },
        {
          "id": 22,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 312,
          "date": "2025-08-17",
          "is_anonymous": true,
          "location": {
            "city": "Ramallah",
            "country": "Palestine"
          }
        },
        {
          "id": 30,
          "name": "Bank al Etihad",
          "type": "Corporate",
          "amount": 5647,
          "date": "2025-08-15",
          "is_anonymous": false,
          "location": {
            "city": "Aqaba",
            "country": "UAE"
          },
          "message": "Investing in education is investing in tomorrow."
        },
        {
          "id": 12,
          "name": "Mohammed Hassan",
          "type": "Individual",
          "amount": 47,
          "date": "2025-08-11",
          "is_anonymous": false,
          "location": {
            "city": "Irbid",
            "country": "Lebanon"
          }
        },
        {
          "id": 34,
          "name": "Bank al Etihad",
          "type": "Corporate",
          "amount": 2822,
          "date": "2025-08-09",
          "is_anonymous": false,
          "location": {
            "city": "Aqaba",
            "country": "Syria"
          }
        },
        {
          "id": 35,
          "name": "Michael Brown",
          "type": "Individual",
          "amount": 200,
          "date": "2025-08-08",
          "is_anonymous": false,
          "location": {
            "city": "Alexandria",
            "country": "Syria"
          },
          "message": "Investing in education is investing in tomorrow."
        },
        {
          "id": 29,
          "name": "Sarah Johnson",
          "type": "Individual",
          "amount": 399,
          "date": "2025-08-07",
          "is_anonymous": false,
          "location": {
            "city": "Zarqa",
            "country": "Egypt"
          }
        },
        {
          "id": 6,
          "name": "Omar Qasemi",
          "type": "Individual",
          "amount": 465,
          "date": "2025-08-03",
          "is_anonymous": false,
          "location": {
            "city": "Hebron",
            "country": "Egypt"
          }
        },
        {
          "id": 1,
          "name": "Jordan Education Trust",
          "type": "Individual",
          "amount": 292,
          "date": "2025-07-27",
          "is_anonymous": false,
          "location": {
            "city": "Cairo",
            "country": "Palestine"
          },
          "message": "Every child deserves access to quality education."
        },
        {
          "id": 3,
          "name": "Tech for Good Initiative",
          "type": "Individual",
          "amount": 194,
          "date": "2025-07-27",
          "is_anonymous": false,
          "location": {
            "city": "Cairo",
            "country": "Jordan"
          },
          "message": "Small businesses are the backbone of our community."
        },
        {
          "id": 25,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 345,
          "date": "2025-07-27",
          "is_anonymous": true,
          "location": {
            "city": "Alexandria",
            "country": "Saudi Arabia"
          },
          "message": "Supporting sustainable agriculture for generations to come."
        },
        {
          "id": 8,
          "name": "Levant Construction Group",
          "type": "Corporate",
          "amount": 3863,
          "date": "2025-07-25",
          "is_anonymous": false,
          "location": {
            "city": "Alexandria",
            "country": "UAE"
          }
        },
        {
          "id": 7,
          "name": "David Smith",
          "type": "Individual",
          "amount": 211,
          "date": "2025-07-22",
          "is_anonymous": false,
          "location": {
            "city": "Amman",
            "country": "Egypt"
          }
        },
        {
          "id": 17,
          "name": "Anonymous Donor",
          "type": "Foundation",
          "amount": 1753,
          "date": "2025-07-16",
          "is_anonymous": true,
          "location": {
            "city": "Ramallah",
            "country": "UAE"
          },
          "message": "Small businesses are the backbone of our community."
        },
        {
          "id": 18,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 299,
          "date": "2025-07-12",
          "is_anonymous": true,
          "location": {
            "city": "Ramallah",
            "country": "Egypt"
          }
        },
        {
          "id": 16,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 3653,
          "date": "2025-07-08",
          "is_anonymous": true,
          "location": {
            "city": "Gaza",
            "country": "Lebanon"
          }
        },
        {
          "id": 15,
          "name": "Michael Brown",
          "type": "Individual",
          "amount": 60,
          "date": "2025-06-26",
          "is_anonymous": false,
          "location": {
            "city": "Ramallah",
            "country": "Saudi Arabia"
          },
          "message": "Supporting our farmers means securing our future."
        },
        {
          "id": 19,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 348,
          "date": "2025-06-26",
          "is_anonymous": true,
          "location": {
            "city": "Irbid",
            "country": "Qatar"
          }
        },
        {
          "id": 2,
          "name": "Sarah Johnson",
          "type": "Individual",
          "amount": 128,
          "date": "2025-06-23",
          "is_anonymous": false,
          "location": {
            "city": "Amman",
            "country": "Syria"
          },
          "message": "Together we can make a real difference."
        },
        {
          "id": 5,
          "name": "Global Impact Foundation",
          "type": "Individual",
          "amount": 304,
          "date": "2025-06-18",
          "is_anonymous": false,
          "location": {
            "city": "Irbid",
            "country": "Qatar"
          }
        },
        {
          "id": 26,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 427,
          "date": "2025-06-17",
          "is_anonymous": true,
          "location": {
            "city": "Nablus",
            "country": "Qatar"
          }
        }
      ],
      "timeline": {
        "created_date": "2024-10-15",
        "target_date": "2025-01-30",
        "last_updated": "2024-12-20"
      },
      "tags": [
        "education",
        "technology",
        "palestine",
        "digital-divide",
        "youth"
      ],
      "impact_metrics": {
        "beneficiaries": 500,
        "metric_description": "students will gain access to digital learning tools"
      },
      "updates": [
        {
          "date": "2024-12-20",
          "title": "70% Funding Milestone Reached!",
          "description": "We're thrilled to announce we've reached 70% of our funding goal! The first batch of 150 laptops has been ordered and will arrive next month."
        },
        {
          "date": "2024-12-01",
          "title": "Partnership with Local Tech Company",
          "description": "We've partnered with Gaza Tech Solutions to provide ongoing technical support and maintenance for all devices."
        },
        {
          "date": "2024-11-15",
          "title": "Teacher Training Program Launched",
          "description": "Started training sessions for 25 teachers across participating schools on digital teaching methodologies."
        }
      ]
    },
    {
      "id": 2,
      "title": "Vocational Training Center for Jordanian Youth",
      "category": "Education",
      "status": "Active",
      "urgency_level": "Medium",
      "short_description": "Establishing a modern vocational training center in Zarqa to provide technical skills training for 200 unemployed youth aged 18-25.",
      "detailed_description": "Jordan faces a youth unemployment rate of over 50%, with many young people lacking the technical skills needed for available jobs. This project will establish a comprehensive vocational training center offering courses in electrical work, plumbing, automotive repair, carpentry, and computer skills. The center will include modern equipment, certified instructors, and job placement assistance. We aim to train 200 youth annually with a focus on hands-on learning and industry partnerships to ensure graduates find meaningful employment.",
      "image_url": "/photos/student.jpg",
      "location": {
        "city": "Zarqa",
        "country": "Jordan",
        "region": "Middle East",
        "latitude": 32.0728,
        "longitude": 36.0876
      },
      "metrics": {
        "goal_amount": 120000,
        "raised_amount": 89500,
        "percentage_funded": 75,
        "donor_count": 50,
        "average_donation": 1790,
        "days_remaining": 49,
        "days_active": 316
      },
      "contact": {
        "organization": "Jordan Youth Development Society",
        "coordinator": "Engineer Ahmad Al-Khatib",
        "email": "ahmad.khatib@jyds.jo",
        "phone": "+962-5-456-7890"
      },
      "donors": [
        {
          "id": 34,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 82,
          "date": "2025-09-13",
          "is_anonymous": true,
          "location": {
            "city": "Amman",
            "country": "Jordan"
          },
          "message": "Education is the key to breaking the cycle of poverty."
        },
        {
          "id": 45,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 131,
          "date": "2025-09-13",
          "is_anonymous": true,
          "location": {
            "city": "Ramallah",
            "country": "Palestine"
          }
        },
        {
          "id": 2,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 3897,
          "date": "2025-09-11",
          "is_anonymous": true,
          "location": {
            "city": "Irbid",
            "country": "Lebanon"
          }
        },
        {
          "id": 23,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 4889,
          "date": "2025-09-09",
          "is_anonymous": true,
          "location": {
            "city": "Gaza",
            "country": "Saudi Arabia"
          }
        },
        {
          "id": 48,
          "name": "Sarah Johnson",
          "type": "Individual",
          "amount": 156,
          "date": "2025-09-09",
          "is_anonymous": false,
          "location": {
            "city": "Hebron",
            "country": "Jordan"
          }
        },
        {
          "id": 21,
          "name": "David Smith",
          "type": "Individual",
          "amount": 37,
          "date": "2025-09-01",
          "is_anonymous": false,
          "location": {
            "city": "Irbid",
            "country": "Lebanon"
          }
        },
        {
          "id": 22,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 227,
          "date": "2025-09-01",
          "is_anonymous": true,
          "location": {
            "city": "Nablus",
            "country": "Jordan"
          }
        },
        {
          "id": 37,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 1233,
          "date": "2025-08-31",
          "is_anonymous": true,
          "location": {
            "city": "Hebron",
            "country": "Palestine"
          },
          "message": "Every child deserves access to quality education."
        },
        {
          "id": 42,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 86,
          "date": "2025-08-31",
          "is_anonymous": true,
          "location": {
            "city": "Nablus",
            "country": "Lebanon"
          }
        },
        {
          "id": 16,
          "name": "Tech for Good Initiative",
          "type": "Individual",
          "amount": 231,
          "date": "2025-08-27",
          "is_anonymous": false,
          "location": {
            "city": "Cairo",
            "country": "Qatar"
          },
          "message": "Investing in education is investing in tomorrow."
        },
        {
          "id": 50,
          "name": "Women Entrepreneurs Fund",
          "type": "Individual",
          "amount": 400,
          "date": "2025-08-25",
          "is_anonymous": false,
          "location": {
            "city": "Hebron",
            "country": "Egypt"
          },
          "message": "Supporting sustainable agriculture for generations to come."
        },
        {
          "id": 12,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 201,
          "date": "2025-08-24",
          "is_anonymous": true,
          "location": {
            "city": "Irbid",
            "country": "Syria"
          }
        },
        {
          "id": 25,
          "name": "Cairo Capital Partners",
          "type": "Corporate",
          "amount": 2882,
          "date": "2025-08-21",
          "is_anonymous": false,
          "location": {
            "city": "Aqaba",
            "country": "Lebanon"
          }
        },
        {
          "id": 13,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 1690,
          "date": "2025-08-17",
          "is_anonymous": true,
          "location": {
            "city": "Ramallah",
            "country": "Lebanon"
          }
        },
        {
          "id": 6,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 1102,
          "date": "2025-08-16",
          "is_anonymous": true,
          "location": {
            "city": "Gaza",
            "country": "Qatar"
          }
        },
        {
          "id": 4,
          "name": "Gaza Relief Network",
          "type": "Foundation",
          "amount": 3207,
          "date": "2025-08-15",
          "is_anonymous": false,
          "location": {
            "city": "Amman",
            "country": "Lebanon"
          }
        },
        {
          "id": 10,
          "name": "Zaid Foundation",
          "type": "Individual",
          "amount": 321,
          "date": "2025-08-15",
          "is_anonymous": false,
          "location": {
            "city": "Alexandria",
            "country": "Syria"
          }
        },
        {
          "id": 24,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 4993,
          "date": "2025-08-14",
          "is_anonymous": true,
          "location": {
            "city": "Amman",
            "country": "Saudi Arabia"
          },
          "message": "Small businesses are the backbone of our community."
        },
        {
          "id": 8,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 357,
          "date": "2025-08-09",
          "is_anonymous": true,
          "location": {
            "city": "Irbid",
            "country": "Palestine"
          }
        },
        {
          "id": 5,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 223,
          "date": "2025-08-05",
          "is_anonymous": true,
          "location": {
            "city": "Cairo",
            "country": "Lebanon"
          }
        },
        {
          "id": 31,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 5127,
          "date": "2025-08-05",
          "is_anonymous": true,
          "location": {
            "city": "Aqaba",
            "country": "UAE"
          }
        },
        {
          "id": 14,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 5520,
          "date": "2025-08-04",
          "is_anonymous": true,
          "location": {
            "city": "Zarqa",
            "country": "Saudi Arabia"
          }
        },
        {
          "id": 27,
          "name": "Anonymous Donor",
          "type": "Foundation",
          "amount": 4890,
          "date": "2025-08-04",
          "is_anonymous": true,
          "location": {
            "city": "Hebron",
            "country": "Saudi Arabia"
          }
        },
        {
          "id": 11,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 136,
          "date": "2025-08-03",
          "is_anonymous": false,
          "location": {
            "city": "Ramallah",
            "country": "Syria"
          },
          "message": "May this contribution help build a better future."
        },
        {
          "id": 38,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 92,
          "date": "2025-08-03",
          "is_anonymous": true,
          "location": {
            "city": "Gaza",
            "country": "UAE"
          },
          "message": "Education is the key to breaking the cycle of poverty."
        },
        {
          "id": 41,
          "name": "Sarah Johnson",
          "type": "Foundation",
          "amount": 2595,
          "date": "2025-08-01",
          "is_anonymous": false,
          "location": {
            "city": "Gaza",
            "country": "Lebanon"
          },
          "message": "May this contribution help build a better future."
        },
        {
          "id": 20,
          "name": "Nour Farouk",
          "type": "Individual",
          "amount": 293,
          "date": "2025-07-31",
          "is_anonymous": false,
          "location": {
            "city": "Irbid",
            "country": "Lebanon"
          }
        },
        {
          "id": 30,
          "name": "Tech for Good Initiative",
          "type": "Individual",
          "amount": 220,
          "date": "2025-07-31",
          "is_anonymous": false,
          "location": {
            "city": "Gaza",
            "country": "Jordan"
          }
        },
        {
          "id": 32,
          "name": "Gaza Relief Network",
          "type": "Foundation",
          "amount": 5900,
          "date": "2025-07-29",
          "is_anonymous": false,
          "location": {
            "city": "Zarqa",
            "country": "Syria"
          },
          "message": "Investing in education is investing in tomorrow."
        },
        {
          "id": 28,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 2914,
          "date": "2025-07-25",
          "is_anonymous": true,
          "location": {
            "city": "Aqaba",
            "country": "Palestine"
          }
        },
        {
          "id": 33,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 3376,
          "date": "2025-07-22",
          "is_anonymous": true,
          "location": {
            "city": "Amman",
            "country": "Qatar"
          },
          "message": "Every child deserves access to quality education."
        },
        {
          "id": 49,
          "name": "Emily Chen",
          "type": "Individual",
          "amount": 52,
          "date": "2025-07-22",
          "is_anonymous": false,
          "location": {
            "city": "Alexandria",
            "country": "Syria"
          },
          "message": "May this contribution help build a better future."
        },
        {
          "id": 40,
          "name": "Palestinian Heritage Society",
          "type": "Individual",
          "amount": 207,
          "date": "2025-07-21",
          "is_anonymous": false,
          "location": {
            "city": "Cairo",
            "country": "Lebanon"
          }
        },
        {
          "id": 15,
          "name": "Jordan Telecom Group",
          "type": "Corporate",
          "amount": 5250,
          "date": "2025-07-20",
          "is_anonymous": false,
          "location": {
            "city": "Amman",
            "country": "Palestine"
          }
        },
        {
          "id": 29,
          "name": "David Smith",
          "type": "Foundation",
          "amount": 4414,
          "date": "2025-07-20",
          "is_anonymous": false,
          "location": {
            "city": "Zarqa",
            "country": "Palestine"
          },
          "message": "Supporting our farmers means securing our future."
        },
        {
          "id": 9,
          "name": "Cairo Capital Partners",
          "type": "Corporate",
          "amount": 1293,
          "date": "2025-07-19",
          "is_anonymous": false,
          "location": {
            "city": "Gaza",
            "country": "Palestine"
          }
        },
        {
          "id": 17,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 5490,
          "date": "2025-07-18",
          "is_anonymous": true,
          "location": {
            "city": "Aqaba",
            "country": "UAE"
          },
          "message": "Small businesses are the backbone of our community."
        },
        {
          "id": 18,
          "name": "Emily Chen",
          "type": "Individual",
          "amount": 238,
          "date": "2025-07-16",
          "is_anonymous": false,
          "location": {
            "city": "Amman",
            "country": "Palestine"
          }
        },
        {
          "id": 43,
          "name": "Desert Rose Industries",
          "type": "Corporate",
          "amount": 2312,
          "date": "2025-07-15",
          "is_anonymous": false,
          "location": {
            "city": "Gaza",
            "country": "UAE"
          }
        },
        {
          "id": 1,
          "name": "Desert Rose Industries",
          "type": "Corporate",
          "amount": 4941,
          "date": "2025-07-14",
          "is_anonymous": false,
          "location": {
            "city": "Amman",
            "country": "Qatar"
          }
        },
        {
          "id": 39,
          "name": "Emily Chen",
          "type": "Individual",
          "amount": 257,
          "date": "2025-07-09",
          "is_anonymous": false,
          "location": {
            "city": "Zarqa",
            "country": "UAE"
          }
        },
        {
          "id": 47,
          "name": "Palestinian Heritage Society",
          "type": "Individual",
          "amount": 442,
          "date": "2025-07-05",
          "is_anonymous": false,
          "location": {
            "city": "Irbid",
            "country": "UAE"
          }
        },
        {
          "id": 44,
          "name": "Women Entrepreneurs Fund",
          "type": "Individual",
          "amount": 117,
          "date": "2025-07-04",
          "is_anonymous": false,
          "location": {
            "city": "Irbid",
            "country": "Jordan"
          }
        },
        {
          "id": 35,
          "name": "Ahmed Al-Rashid",
          "type": "Individual",
          "amount": 145,
          "date": "2025-06-29",
          "is_anonymous": false,
          "location": {
            "city": "Cairo",
            "country": "Qatar"
          }
        },
        {
          "id": 3,
          "name": "Palestinian Heritage Society",
          "type": "Individual",
          "amount": 160,
          "date": "2025-06-26",
          "is_anonymous": false,
          "location": {
            "city": "Aqaba",
            "country": "Qatar"
          },
          "message": "Supporting sustainable agriculture for generations to come."
        },
        {
          "id": 46,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 2835,
          "date": "2025-06-26",
          "is_anonymous": true,
          "location": {
            "city": "Hebron",
            "country": "Palestine"
          }
        },
        {
          "id": 26,
          "name": "Mohammed Hassan",
          "type": "Foundation",
          "amount": 2866,
          "date": "2025-06-23",
          "is_anonymous": false,
          "location": {
            "city": "Gaza",
            "country": "Syria"
          }
        },
        {
          "id": 36,
          "name": "Omar Qasemi",
          "type": "Individual",
          "amount": 453,
          "date": "2025-06-20",
          "is_anonymous": false,
          "location": {
            "city": "Gaza",
            "country": "Lebanon"
          },
          "message": "Every child deserves access to quality education."
        },
        {
          "id": 19,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 148,
          "date": "2025-06-17",
          "is_anonymous": true,
          "location": {
            "city": "Irbid",
            "country": "Saudi Arabia"
          },
          "message": "Education is the key to breaking the cycle of poverty."
        },
        {
          "id": 7,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 420,
          "date": "2025-06-16",
          "is_anonymous": false,
          "location": {
            "city": "Gaza",
            "country": "Lebanon"
          },
          "message": "Supporting our farmers means securing our future."
        }
      ],
      "timeline": {
        "created_date": "2024-11-01",
        "target_date": "2025-03-15",
        "last_updated": "2024-12-19"
      },
      "tags": [
        "vocational-training",
        "youth-employment",
        "jordan",
        "skills-development",
        "job-creation"
      ],
      "impact_metrics": {
        "beneficiaries": 200,
        "metric_description": "young adults will receive certified technical training annually"
      },
      "updates": [
        {
          "date": "2024-12-19",
          "title": "Equipment Procurement Underway",
          "description": "We've started procuring training equipment including automotive tools, electrical testing equipment, and computer stations."
        },
        {
          "date": "2024-12-05",
          "title": "Building Renovation Progress",
          "description": "Renovation of the training center building is 60% complete. New classrooms and workshop spaces are taking shape."
        }
      ]
    },
    {
      "id": 3,
      "title": "Sustainable Farming Initiative for West Bank Villages",
      "category": "Agriculture",
      "status": "Active",
      "urgency_level": "High",
      "short_description": "Supporting 50 Palestinian farming families with modern irrigation systems, greenhouse construction, and sustainable farming techniques.",
      "detailed_description": "Palestinian farmers in the West Bank face severe water restrictions and limited access to modern farming equipment. This initiative provides drip irrigation systems, greenhouse construction materials, seeds for high-yield crops, and training in sustainable farming practices. The project will directly benefit 50 farming families across 5 villages, helping them increase crop yields by 300% while using 60% less water. Additionally, we'll establish a cooperative marketing system to help farmers get better prices for their produce in local and regional markets.",
      "image_url": "/photos/student.jpg",
      "location": {
        "city": "Ramallah",
        "country": "Palestine",
        "region": "Middle East",
        "latitude": 31.9073,
        "longitude": 35.2044
      },
      "metrics": {
        "goal_amount": 95000,
        "raised_amount": 73200,
        "percentage_funded": 77,
        "donor_count": 50,
        "average_donation": 1464,
        "days_remaining": 12,
        "days_active": 353
      },
      "contact": {
        "organization": "Palestinian Agricultural Relief Committee",
        "coordinator": "Nour Al-Qasemi",
        "email": "nour.qasemi@parc.ps",
        "phone": "+970-2-987-6543"
      },
      "donors": [
        {
          "id": 34,
          "name": "Anonymous Donor",
          "type": "Foundation",
          "amount": 5984,
          "date": "2025-09-11",
          "is_anonymous": true,
          "location": {
            "city": "Ramallah",
            "country": "Lebanon"
          }
        },
        {
          "id": 43,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 468,
          "date": "2025-09-10",
          "is_anonymous": true,
          "location": {
            "city": "Irbid",
            "country": "Palestine"
          },
          "message": "Supporting sustainable agriculture for generations to come."
        },
        {
          "id": 14,
          "name": "Jordan Education Trust",
          "type": "Foundation",
          "amount": 1895,
          "date": "2025-09-09",
          "is_anonymous": false,
          "location": {
            "city": "Aqaba",
            "country": "Palestine"
          },
          "message": "Education is the key to breaking the cycle of poverty."
        },
        {
          "id": 5,
          "name": "Mohammed Hassan",
          "type": "Foundation",
          "amount": 4374,
          "date": "2025-09-08",
          "is_anonymous": false,
          "location": {
            "city": "Amman",
            "country": "Syria"
          },
          "message": "Every child deserves access to quality education."
        },
        {
          "id": 46,
          "name": "Michael Brown",
          "type": "Individual",
          "amount": 29,
          "date": "2025-09-07",
          "is_anonymous": false,
          "location": {
            "city": "Nablus",
            "country": "Egypt"
          },
          "message": "Every child deserves access to quality education."
        },
        {
          "id": 18,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 206,
          "date": "2025-09-06",
          "is_anonymous": true,
          "location": {
            "city": "Gaza",
            "country": "Qatar"
          }
        },
        {
          "id": 21,
          "name": "Amman Business Association",
          "type": "Individual",
          "amount": 392,
          "date": "2025-09-06",
          "is_anonymous": false,
          "location": {
            "city": "Nablus",
            "country": "Saudi Arabia"
          }
        },
        {
          "id": 28,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 156,
          "date": "2025-09-03",
          "is_anonymous": true,
          "location": {
            "city": "Alexandria",
            "country": "Syria"
          }
        },
        {
          "id": 4,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 2517,
          "date": "2025-09-02",
          "is_anonymous": true,
          "location": {
            "city": "Irbid",
            "country": "Jordan"
          },
          "message": "Supporting sustainable agriculture for generations to come."
        },
        {
          "id": 9,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 121,
          "date": "2025-08-30",
          "is_anonymous": true,
          "location": {
            "city": "Amman",
            "country": "Saudi Arabia"
          }
        },
        {
          "id": 32,
          "name": "Jordan Education Trust",
          "type": "Foundation",
          "amount": 1666,
          "date": "2025-08-28",
          "is_anonymous": false,
          "location": {
            "city": "Aqaba",
            "country": "Qatar"
          },
          "message": "Investing in education is investing in tomorrow."
        },
        {
          "id": 13,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 404,
          "date": "2025-08-27",
          "is_anonymous": true,
          "location": {
            "city": "Alexandria",
            "country": "Saudi Arabia"
          }
        },
        {
          "id": 48,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 4282,
          "date": "2025-08-27",
          "is_anonymous": true,
          "location": {
            "city": "Irbid",
            "country": "UAE"
          }
        },
        {
          "id": 22,
          "name": "Oasis Technologies",
          "type": "Corporate",
          "amount": 4086,
          "date": "2025-08-24",
          "is_anonymous": false,
          "location": {
            "city": "Aqaba",
            "country": "Saudi Arabia"
          }
        },
        {
          "id": 17,
          "name": "Cairo Community Fund",
          "type": "Individual",
          "amount": 384,
          "date": "2025-08-22",
          "is_anonymous": false,
          "location": {
            "city": "Alexandria",
            "country": "Egypt"
          },
          "message": "Together we can make a real difference."
        },
        {
          "id": 24,
          "name": "Bank al Etihad",
          "type": "Corporate",
          "amount": 2013,
          "date": "2025-08-21",
          "is_anonymous": false,
          "location": {
            "city": "Cairo",
            "country": "Syria"
          }
        },
        {
          "id": 2,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 231,
          "date": "2025-08-19",
          "is_anonymous": true,
          "location": {
            "city": "Cairo",
            "country": "Egypt"
          },
          "message": "Together we can make a real difference."
        },
        {
          "id": 11,
          "name": "Ahmed Al-Rashid",
          "type": "Individual",
          "amount": 153,
          "date": "2025-08-19",
          "is_anonymous": false,
          "location": {
            "city": "Irbid",
            "country": "UAE"
          },
          "message": "May this contribution help build a better future."
        },
        {
          "id": 6,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 3626,
          "date": "2025-08-16",
          "is_anonymous": true,
          "location": {
            "city": "Gaza",
            "country": "Egypt"
          },
          "message": "Every child deserves access to quality education."
        },
        {
          "id": 36,
          "name": "Jordan Education Trust",
          "type": "Foundation",
          "amount": 2947,
          "date": "2025-08-16",
          "is_anonymous": false,
          "location": {
            "city": "Zarqa",
            "country": "Egypt"
          }
        },
        {
          "id": 27,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 37,
          "date": "2025-08-15",
          "is_anonymous": true,
          "location": {
            "city": "Gaza",
            "country": "Qatar"
          }
        },
        {
          "id": 23,
          "name": "Global Impact Foundation",
          "type": "Individual",
          "amount": 287,
          "date": "2025-08-11",
          "is_anonymous": false,
          "location": {
            "city": "Irbid",
            "country": "UAE"
          }
        },
        {
          "id": 49,
          "name": "Omar Qasemi",
          "type": "Individual",
          "amount": 436,
          "date": "2025-08-10",
          "is_anonymous": false,
          "location": {
            "city": "Ramallah",
            "country": "Lebanon"
          }
        },
        {
          "id": 26,
          "name": "Amman Business Association",
          "type": "Individual",
          "amount": 220,
          "date": "2025-08-08",
          "is_anonymous": false,
          "location": {
            "city": "Irbid",
            "country": "Saudi Arabia"
          }
        },
        {
          "id": 47,
          "name": "Nour Farouk",
          "type": "Individual",
          "amount": 253,
          "date": "2025-08-05",
          "is_anonymous": false,
          "location": {
            "city": "Irbid",
            "country": "Lebanon"
          }
        },
        {
          "id": 37,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 305,
          "date": "2025-08-04",
          "is_anonymous": true,
          "location": {
            "city": "Irbid",
            "country": "Egypt"
          },
          "message": "Investing in education is investing in tomorrow."
        },
        {
          "id": 15,
          "name": "Fatima Al-Zahra",
          "type": "Individual",
          "amount": 97,
          "date": "2025-08-01",
          "is_anonymous": false,
          "location": {
            "city": "Amman",
            "country": "Syria"
          },
          "message": "Supporting our farmers means securing our future."
        },
        {
          "id": 10,
          "name": "Omar Qasemi",
          "type": "Individual",
          "amount": 169,
          "date": "2025-07-29",
          "is_anonymous": false,
          "location": {
            "city": "Ramallah",
            "country": "Saudi Arabia"
          }
        },
        {
          "id": 41,
          "name": "David Smith",
          "type": "Individual",
          "amount": 466,
          "date": "2025-07-24",
          "is_anonymous": false,
          "location": {
            "city": "Ramallah",
            "country": "Lebanon"
          },
          "message": "Education is the key to breaking the cycle of poverty."
        },
        {
          "id": 44,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 2707,
          "date": "2025-07-24",
          "is_anonymous": true,
          "location": {
            "city": "Cairo",
            "country": "Jordan"
          }
        },
        {
          "id": 29,
          "name": "Omar Qasemi",
          "type": "Individual",
          "amount": 306,
          "date": "2025-07-23",
          "is_anonymous": false,
          "location": {
            "city": "Aqaba",
            "country": "Jordan"
          }
        },
        {
          "id": 20,
          "name": "Nour Farouk",
          "type": "Individual",
          "amount": 410,
          "date": "2025-07-22",
          "is_anonymous": false,
          "location": {
            "city": "Hebron",
            "country": "Saudi Arabia"
          }
        },
        {
          "id": 38,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 104,
          "date": "2025-07-21",
          "is_anonymous": true,
          "location": {
            "city": "Zarqa",
            "country": "Saudi Arabia"
          }
        },
        {
          "id": 7,
          "name": "Jordan Education Trust",
          "type": "Individual",
          "amount": 292,
          "date": "2025-07-17",
          "is_anonymous": false,
          "location": {
            "city": "Amman",
            "country": "Palestine"
          },
          "message": "Investing in education is investing in tomorrow."
        },
        {
          "id": 39,
          "name": "Cairo Community Fund",
          "type": "Individual",
          "amount": 26,
          "date": "2025-07-17",
          "is_anonymous": false,
          "location": {
            "city": "Ramallah",
            "country": "Jordan"
          },
          "message": "Supporting sustainable agriculture for generations to come."
        },
        {
          "id": 30,
          "name": "Women Entrepreneurs Fund",
          "type": "Individual",
          "amount": 375,
          "date": "2025-07-16",
          "is_anonymous": false,
          "location": {
            "city": "Irbid",
            "country": "UAE"
          },
          "message": "Every child deserves access to quality education."
        },
        {
          "id": 50,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 233,
          "date": "2025-07-14",
          "is_anonymous": true,
          "location": {
            "city": "Aqaba",
            "country": "Egypt"
          }
        },
        {
          "id": 19,
          "name": "Cairo Capital Partners",
          "type": "Corporate",
          "amount": 2639,
          "date": "2025-07-13",
          "is_anonymous": false,
          "location": {
            "city": "Alexandria",
            "country": "Qatar"
          },
          "message": "Together we can make a real difference."
        },
        {
          "id": 25,
          "name": "Aramex Foundation",
          "type": "Corporate",
          "amount": 5423,
          "date": "2025-07-11",
          "is_anonymous": false,
          "location": {
            "city": "Irbid",
            "country": "Palestine"
          }
        },
        {
          "id": 40,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 118,
          "date": "2025-07-05",
          "is_anonymous": true,
          "location": {
            "city": "Aqaba",
            "country": "Lebanon"
          },
          "message": "Supporting our farmers means securing our future."
        },
        {
          "id": 42,
          "name": "Aramex Foundation",
          "type": "Corporate",
          "amount": 1025,
          "date": "2025-07-03",
          "is_anonymous": false,
          "location": {
            "city": "Aqaba",
            "country": "Jordan"
          }
        },
        {
          "id": 8,
          "name": "Cairo Community Fund",
          "type": "Individual",
          "amount": 314,
          "date": "2025-07-02",
          "is_anonymous": false,
          "location": {
            "city": "Ramallah",
            "country": "Syria"
          }
        },
        {
          "id": 1,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 77,
          "date": "2025-06-30",
          "is_anonymous": false,
          "location": {
            "city": "Gaza",
            "country": "Egypt"
          }
        },
        {
          "id": 12,
          "name": "Bank al Etihad",
          "type": "Corporate",
          "amount": 4925,
          "date": "2025-06-30",
          "is_anonymous": false,
          "location": {
            "city": "Aqaba",
            "country": "Lebanon"
          },
          "message": "Together we can make a real difference."
        },
        {
          "id": 16,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 3929,
          "date": "2025-06-26",
          "is_anonymous": true,
          "location": {
            "city": "Hebron",
            "country": "Syria"
          },
          "message": "Every child deserves access to quality education."
        },
        {
          "id": 3,
          "name": "Zaid Foundation",
          "type": "Individual",
          "amount": 268,
          "date": "2025-06-23",
          "is_anonymous": false,
          "location": {
            "city": "Aqaba",
            "country": "Jordan"
          }
        },
        {
          "id": 35,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 226,
          "date": "2025-06-23",
          "is_anonymous": true,
          "location": {
            "city": "Cairo",
            "country": "Egypt"
          }
        },
        {
          "id": 31,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 181,
          "date": "2025-06-22",
          "is_anonymous": true,
          "location": {
            "city": "Zarqa",
            "country": "UAE"
          }
        },
        {
          "id": 45,
          "name": "Sarah Johnson",
          "type": "Individual",
          "amount": 215,
          "date": "2025-06-22",
          "is_anonymous": false,
          "location": {
            "city": "Hebron",
            "country": "Saudi Arabia"
          }
        },
        {
          "id": 33,
          "name": "Cairo Community Fund",
          "type": "Individual",
          "amount": 87,
          "date": "2025-06-19",
          "is_anonymous": false,
          "location": {
            "city": "Gaza",
            "country": "Egypt"
          },
          "message": "Every child deserves access to quality education."
        }
      ],
      "timeline": {
        "created_date": "2024-09-25",
        "target_date": "2025-04-20",
        "last_updated": "2024-12-18"
      },
      "tags": [
        "sustainable-agriculture",
        "water-conservation",
        "palestine",
        "food-security",
        "rural-development"
      ],
      "impact_metrics": {
        "beneficiaries": 50,
        "metric_description": "farming families will increase their crop yields and income"
      },
      "updates": [
        {
          "date": "2024-12-18",
          "title": "First Greenhouse Completed!",
          "description": "The first greenhouse in Beit Rima village is now operational. Farmers are already seeing improved crop protection and yields."
        },
        {
          "date": "2024-12-01",
          "title": "Irrigation Systems Installation",
          "description": "Drip irrigation systems have been installed in 3 villages, reducing water usage by 55% while maintaining crop quality."
        },
        {
          "date": "2024-11-20",
          "title": "Farmer Training Workshop Success",
          "description": "Completed intensive 5-day training workshops for 30 farmers on sustainable farming techniques and greenhouse management."
        }
      ]
    },
    {
      "id": 4,
      "title": "Organic Farming Cooperative in Upper Egypt",
      "category": "Agriculture",
      "status": "Active",
      "urgency_level": "Medium",
      "short_description": "Establishing an organic farming cooperative for 40 smallholder farmers in Aswan to access premium markets and increase incomes by 200%.",
      "detailed_description": "Small farmers in Upper Egypt struggle with low-income from traditional farming methods and lack access to premium markets. This project establishes an organic farming cooperative providing certification support, organic inputs, training in organic methods, and direct access to premium markets in Cairo and Alexandria. The cooperative will help 40 farmers transition to organic production, achieve international organic certification, and access export opportunities. We'll also establish a processing facility for value-added products like organic dates, herbs, and vegetables.",
      "image_url": "/photos/student.jpg",
      "location": {
        "city": "Aswan",
        "country": "Egypt",
        "region": "Middle East",
        "latitude": 24.0889,
        "longitude": 32.8998
      },
      "metrics": {
        "goal_amount": 85000,
        "raised_amount": 41200,
        "percentage_funded": 48,
        "donor_count": 28,
        "average_donation": 1471,
        "days_remaining": 66,
        "days_active": 299
      },
      "contact": {
        "organization": "Egyptian Organic Agriculture Association",
        "coordinator": "Dr. Maha Abdel Rahman",
        "email": "maha.rahman@eoaa.org.eg",
        "phone": "+20-97-234-5678"
      },
      "donors": [
        {
          "id": 7,
          "name": "David Smith",
          "type": "Individual",
          "amount": 432,
          "date": "2025-09-13",
          "is_anonymous": false,
          "location": {
            "city": "Aqaba",
            "country": "Saudi Arabia"
          }
        },
        {
          "id": 4,
          "name": "Cairo Capital Partners",
          "type": "Corporate",
          "amount": 2743,
          "date": "2025-09-06",
          "is_anonymous": false,
          "location": {
            "city": "Ramallah",
            "country": "Egypt"
          },
          "message": "Together we can make a real difference."
        },
        {
          "id": 27,
          "name": "Anonymous Donor",
          "type": "Foundation",
          "amount": 3701,
          "date": "2025-09-06",
          "is_anonymous": true,
          "location": {
            "city": "Irbid",
            "country": "Syria"
          },
          "message": "Investing in education is investing in tomorrow."
        },
        {
          "id": 16,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 1782,
          "date": "2025-09-04",
          "is_anonymous": true,
          "location": {
            "city": "Amman",
            "country": "Palestine"
          },
          "message": "Investing in education is investing in tomorrow."
        },
        {
          "id": 9,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 5487,
          "date": "2025-09-01",
          "is_anonymous": true,
          "location": {
            "city": "Alexandria",
            "country": "Lebanon"
          }
        },
        {
          "id": 17,
          "name": "Ahmed Al-Rashid",
          "type": "Individual",
          "amount": 376,
          "date": "2025-08-24",
          "is_anonymous": false,
          "location": {
            "city": "Zarqa",
            "country": "Syria"
          }
        },
        {
          "id": 21,
          "name": "Sarah Johnson",
          "type": "Individual",
          "amount": 297,
          "date": "2025-08-22",
          "is_anonymous": false,
          "location": {
            "city": "Aqaba",
            "country": "Palestine"
          },
          "message": "Every child deserves access to quality education."
        },
        {
          "id": 8,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 5117,
          "date": "2025-08-19",
          "is_anonymous": true,
          "location": {
            "city": "Hebron",
            "country": "Lebanon"
          }
        },
        {
          "id": 25,
          "name": "Bank al Etihad",
          "type": "Corporate",
          "amount": 2455,
          "date": "2025-08-15",
          "is_anonymous": false,
          "location": {
            "city": "Aqaba",
            "country": "UAE"
          }
        },
        {
          "id": 5,
          "name": "Tech for Good Initiative",
          "type": "Individual",
          "amount": 176,
          "date": "2025-08-03",
          "is_anonymous": false,
          "location": {
            "city": "Zarqa",
            "country": "UAE"
          }
        },
        {
          "id": 2,
          "name": "Palestinian Heritage Society",
          "type": "Individual",
          "amount": 174,
          "date": "2025-07-29",
          "is_anonymous": false,
          "location": {
            "city": "Nablus",
            "country": "UAE"
          }
        },
        {
          "id": 24,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 85,
          "date": "2025-07-29",
          "is_anonymous": true,
          "location": {
            "city": "Cairo",
            "country": "Qatar"
          }
        },
        {
          "id": 6,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 207,
          "date": "2025-07-28",
          "is_anonymous": true,
          "location": {
            "city": "Alexandria",
            "country": "Syria"
          },
          "message": "Supporting our farmers means securing our future."
        },
        {
          "id": 18,
          "name": "Oasis Technologies",
          "type": "Corporate",
          "amount": 1107,
          "date": "2025-07-28",
          "is_anonymous": false,
          "location": {
            "city": "Amman",
            "country": "Lebanon"
          },
          "message": "Small businesses are the backbone of our community."
        },
        {
          "id": 13,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 1493,
          "date": "2025-07-22",
          "is_anonymous": true,
          "location": {
            "city": "Zarqa",
            "country": "UAE"
          },
          "message": "Small businesses are the backbone of our community."
        },
        {
          "id": 3,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 62,
          "date": "2025-07-20",
          "is_anonymous": true,
          "location": {
            "city": "Cairo",
            "country": "Lebanon"
          },
          "message": "Together we can make a real difference."
        },
        {
          "id": 28,
          "name": "David Smith",
          "type": "Individual",
          "amount": 31,
          "date": "2025-07-16",
          "is_anonymous": false,
          "location": {
            "city": "Aqaba",
            "country": "Jordan"
          }
        },
        {
          "id": 20,
          "name": "Layla Hijazi",
          "type": "Individual",
          "amount": 148,
          "date": "2025-07-13",
          "is_anonymous": false,
          "location": {
            "city": "Aqaba",
            "country": "Egypt"
          }
        },
        {
          "id": 1,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 391,
          "date": "2025-07-11",
          "is_anonymous": true,
          "location": {
            "city": "Cairo",
            "country": "Saudi Arabia"
          }
        },
        {
          "id": 15,
          "name": "Jordan Education Trust",
          "type": "Individual",
          "amount": 328,
          "date": "2025-07-05",
          "is_anonymous": false,
          "location": {
            "city": "Aqaba",
            "country": "Qatar"
          }
        },
        {
          "id": 14,
          "name": "Levant Construction Group",
          "type": "Corporate",
          "amount": 4227,
          "date": "2025-07-04",
          "is_anonymous": false,
          "location": {
            "city": "Aqaba",
            "country": "Saudi Arabia"
          },
          "message": "Investing in education is investing in tomorrow."
        },
        {
          "id": 11,
          "name": "Oasis Technologies",
          "type": "Corporate",
          "amount": 3252,
          "date": "2025-07-01",
          "is_anonymous": false,
          "location": {
            "city": "Zarqa",
            "country": "Saudi Arabia"
          }
        },
        {
          "id": 23,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 459,
          "date": "2025-07-01",
          "is_anonymous": true,
          "location": {
            "city": "Gaza",
            "country": "Egypt"
          },
          "message": "May this contribution help build a better future."
        },
        {
          "id": 19,
          "name": "Desert Rose Industries",
          "type": "Corporate",
          "amount": 5424,
          "date": "2025-06-28",
          "is_anonymous": false,
          "location": {
            "city": "Nablus",
            "country": "Saudi Arabia"
          }
        },
        {
          "id": 10,
          "name": "Palestinian Heritage Society",
          "type": "Individual",
          "amount": 498,
          "date": "2025-06-27",
          "is_anonymous": false,
          "location": {
            "city": "Cairo",
            "country": "Lebanon"
          },
          "message": "Small businesses are the backbone of our community."
        },
        {
          "id": 12,
          "name": "Emily Chen",
          "type": "Individual",
          "amount": 77,
          "date": "2025-06-23",
          "is_anonymous": false,
          "location": {
            "city": "Aqaba",
            "country": "Lebanon"
          },
          "message": "Small businesses are the backbone of our community."
        },
        {
          "id": 26,
          "name": "Palestinian Heritage Society",
          "type": "Individual",
          "amount": 497,
          "date": "2025-06-18",
          "is_anonymous": false,
          "location": {
            "city": "Cairo",
            "country": "Jordan"
          },
          "message": "Education is the key to breaking the cycle of poverty."
        },
        {
          "id": 22,
          "name": "Omar Qasemi",
          "type": "Individual",
          "amount": 174,
          "date": "2025-06-16",
          "is_anonymous": false,
          "location": {
            "city": "Amman",
            "country": "Lebanon"
          }
        }
      ],
      "timeline": {
        "created_date": "2024-11-18",
        "target_date": "2025-06-01",
        "last_updated": "2024-12-17"
      },
      "tags": [
        "organic-farming",
        "cooperative",
        "egypt",
        "market-access",
        "rural-income"
      ],
      "impact_metrics": {
        "beneficiaries": 40,
        "metric_description": "smallholder farmers will transition to profitable organic farming"
      },
      "updates": [
        {
          "date": "2024-12-17",
          "title": "Cooperative Registration Complete",
          "description": "The Aswan Organic Farmers Cooperative has been officially registered and the founding members have been elected."
        },
        {
          "date": "2024-12-10",
          "title": "Organic Certification Process Started",
          "description": "Began the organic certification process with international certifying body. First inspections scheduled for January."
        }
      ]
    },
    {
      "id": 5,
      "title": "Women's Microfinance Program - Jordan",
      "category": "Small Business",
      "status": "Active",
      "urgency_level": "High",
      "short_description": "Providing microloans and business training to 100 women entrepreneurs in rural Jordan to start small businesses and achieve financial independence.",
      "detailed_description": "Rural women in Jordan face significant barriers to starting businesses, including limited access to capital, business training, and markets. This comprehensive program provides microloans of $500-$2000, business skills training, mentorship, and market access support to 100 women across 10 rural communities. The program includes training in financial literacy, marketing, product development, and digital commerce. We'll also establish a cooperative marketplace to help participants sell their products. The program has a 95% loan repayment rate and creates an average of 2.5 jobs per participant.",
      "image_url": "/photos/student.jpg",
      "location": {
        "city": "Mafraq",
        "country": "Jordan",
        "region": "Middle East",
        "latitude": 32.3434,
        "longitude": 36.2081
      },
      "metrics": {
        "goal_amount": 150000,
        "raised_amount": 127500,
        "percentage_funded": 85,
        "donor_count": 50,
        "average_donation": 2550,
        "days_remaining": 22,
        "days_active": 343
      },
      "contact": {
        "organization": "Jordan Women's Economic Empowerment Foundation",
        "coordinator": "Fatima Al-Zahra",
        "email": "fatima.zahra@jweef.jo",
        "phone": "+962-2-345-6789"
      },
      "donors": [
        {
          "id": 37,
          "name": "Heritage Investment Fund",
          "type": "Corporate",
          "amount": 5894,
          "date": "2025-09-12",
          "is_anonymous": false,
          "location": {
            "city": "Nablus",
            "country": "Jordan"
          },
          "message": "Together we can make a real difference."
        },
        {
          "id": 32,
          "name": "Gaza Relief Network",
          "type": "Foundation",
          "amount": 2733,
          "date": "2025-09-08",
          "is_anonymous": false,
          "location": {
            "city": "Amman",
            "country": "Syria"
          },
          "message": "Together we can make a real difference."
        },
        {
          "id": 43,
          "name": "Aramex Foundation",
          "type": "Corporate",
          "amount": 4670,
          "date": "2025-09-07",
          "is_anonymous": false,
          "location": {
            "city": "Cairo",
            "country": "Palestine"
          }
        },
        {
          "id": 33,
          "name": "Layla Hijazi",
          "type": "Individual",
          "amount": 76,
          "date": "2025-09-05",
          "is_anonymous": false,
          "location": {
            "city": "Zarqa",
            "country": "Saudi Arabia"
          }
        },
        {
          "id": 16,
          "name": "Tech for Good Initiative",
          "type": "Individual",
          "amount": 332,
          "date": "2025-09-03",
          "is_anonymous": false,
          "location": {
            "city": "Nablus",
            "country": "Qatar"
          },
          "message": "May this contribution help build a better future."
        },
        {
          "id": 21,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 291,
          "date": "2025-09-01",
          "is_anonymous": true,
          "location": {
            "city": "Amman",
            "country": "Egypt"
          }
        },
        {
          "id": 46,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 403,
          "date": "2025-09-01",
          "is_anonymous": true,
          "location": {
            "city": "Gaza",
            "country": "Qatar"
          }
        },
        {
          "id": 6,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 417,
          "date": "2025-08-26",
          "is_anonymous": true,
          "location": {
            "city": "Cairo",
            "country": "Qatar"
          }
        },
        {
          "id": 4,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 1545,
          "date": "2025-08-20",
          "is_anonymous": true,
          "location": {
            "city": "Ramallah",
            "country": "Qatar"
          }
        },
        {
          "id": 34,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 382,
          "date": "2025-08-19",
          "is_anonymous": true,
          "location": {
            "city": "Zarqa",
            "country": "Saudi Arabia"
          },
          "message": "Every child deserves access to quality education."
        },
        {
          "id": 48,
          "name": "Desert Rose Industries",
          "type": "Corporate",
          "amount": 1596,
          "date": "2025-08-19",
          "is_anonymous": false,
          "location": {
            "city": "Amman",
            "country": "Palestine"
          },
          "message": "Every child deserves access to quality education."
        },
        {
          "id": 38,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 402,
          "date": "2025-08-18",
          "is_anonymous": true,
          "location": {
            "city": "Gaza",
            "country": "Lebanon"
          },
          "message": "Investing in education is investing in tomorrow."
        },
        {
          "id": 40,
          "name": "Aramex Foundation",
          "type": "Corporate",
          "amount": 1835,
          "date": "2025-08-18",
          "is_anonymous": false,
          "location": {
            "city": "Irbid",
            "country": "Qatar"
          }
        },
        {
          "id": 13,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 2404,
          "date": "2025-08-15",
          "is_anonymous": true,
          "location": {
            "city": "Ramallah",
            "country": "Syria"
          }
        },
        {
          "id": 47,
          "name": "Cairo Community Fund",
          "type": "Individual",
          "amount": 459,
          "date": "2025-08-14",
          "is_anonymous": false,
          "location": {
            "city": "Zarqa",
            "country": "Saudi Arabia"
          }
        },
        {
          "id": 2,
          "name": "Women Entrepreneurs Fund",
          "type": "Individual",
          "amount": 464,
          "date": "2025-08-11",
          "is_anonymous": false,
          "location": {
            "city": "Irbid",
            "country": "Palestine"
          }
        },
        {
          "id": 30,
          "name": "Global Impact Foundation",
          "type": "Foundation",
          "amount": 4853,
          "date": "2025-08-11",
          "is_anonymous": false,
          "location": {
            "city": "Hebron",
            "country": "Qatar"
          },
          "message": "Supporting sustainable agriculture for generations to come."
        },
        {
          "id": 41,
          "name": "Fatima Al-Zahra",
          "type": "Individual",
          "amount": 493,
          "date": "2025-08-11",
          "is_anonymous": false,
          "location": {
            "city": "Nablus",
            "country": "Palestine"
          }
        },
        {
          "id": 14,
          "name": "Tech for Good Initiative",
          "type": "Foundation",
          "amount": 5343,
          "date": "2025-08-08",
          "is_anonymous": false,
          "location": {
            "city": "Nablus",
            "country": "Lebanon"
          },
          "message": "Investing in education is investing in tomorrow."
        },
        {
          "id": 22,
          "name": "Nour Farouk",
          "type": "Individual",
          "amount": 524,
          "date": "2025-08-08",
          "is_anonymous": false,
          "location": {
            "city": "Zarqa",
            "country": "Egypt"
          }
        },
        {
          "id": 36,
          "name": "David Smith",
          "type": "Individual",
          "amount": 479,
          "date": "2025-08-07",
          "is_anonymous": false,
          "location": {
            "city": "Nablus",
            "country": "UAE"
          },
          "message": "Small businesses are the backbone of our community."
        },
        {
          "id": 7,
          "name": "Oasis Technologies",
          "type": "Corporate",
          "amount": 5758,
          "date": "2025-08-06",
          "is_anonymous": false,
          "location": {
            "city": "Hebron",
            "country": "Palestine"
          },
          "message": "Together we can make a real difference."
        },
        {
          "id": 8,
          "name": "Zaid Foundation",
          "type": "Individual",
          "amount": 128,
          "date": "2025-08-05",
          "is_anonymous": false,
          "location": {
            "city": "Zarqa",
            "country": "Egypt"
          },
          "message": "Education is the key to breaking the cycle of poverty."
        },
        {
          "id": 23,
          "name": "Women Entrepreneurs Fund",
          "type": "Foundation",
          "amount": 4170,
          "date": "2025-08-03",
          "is_anonymous": false,
          "location": {
            "city": "Irbid",
            "country": "UAE"
          },
          "message": "Investing in education is investing in tomorrow."
        },
        {
          "id": 35,
          "name": "Cairo Capital Partners",
          "type": "Corporate",
          "amount": 3734,
          "date": "2025-08-02",
          "is_anonymous": false,
          "location": {
            "city": "Cairo",
            "country": "Qatar"
          },
          "message": "Supporting our farmers means securing our future."
        },
        {
          "id": 50,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 30,
          "date": "2025-07-31",
          "is_anonymous": false,
          "location": {
            "city": "Gaza",
            "country": "Egypt"
          },
          "message": "Education is the key to breaking the cycle of poverty."
        },
        {
          "id": 11,
          "name": "Anonymous Donor",
          "type": "Foundation",
          "amount": 5955,
          "date": "2025-07-29",
          "is_anonymous": true,
          "location": {
            "city": "Nablus",
            "country": "Palestine"
          }
        },
        {
          "id": 27,
          "name": "Tech for Good Initiative",
          "type": "Individual",
          "amount": 473,
          "date": "2025-07-29",
          "is_anonymous": false,
          "location": {
            "city": "Aqaba",
            "country": "Saudi Arabia"
          },
          "message": "Education is the key to breaking the cycle of poverty."
        },
        {
          "id": 31,
          "name": "Middle East Development Bank",
          "type": "Corporate",
          "amount": 1820,
          "date": "2025-07-28",
          "is_anonymous": false,
          "location": {
            "city": "Zarqa",
            "country": "Syria"
          }
        },
        {
          "id": 24,
          "name": "Cairo Capital Partners",
          "type": "Corporate",
          "amount": 5414,
          "date": "2025-07-27",
          "is_anonymous": false,
          "location": {
            "city": "Zarqa",
            "country": "Palestine"
          },
          "message": "Supporting our farmers means securing our future."
        },
        {
          "id": 20,
          "name": "Nour Farouk",
          "type": "Individual",
          "amount": 69,
          "date": "2025-07-21",
          "is_anonymous": false,
          "location": {
            "city": "Nablus",
            "country": "UAE"
          }
        },
        {
          "id": 26,
          "name": "Sarah Johnson",
          "type": "Individual",
          "amount": 209,
          "date": "2025-07-18",
          "is_anonymous": false,
          "location": {
            "city": "Aqaba",
            "country": "Syria"
          }
        },
        {
          "id": 1,
          "name": "Gaza Relief Network",
          "type": "Individual",
          "amount": 260,
          "date": "2025-07-16",
          "is_anonymous": false,
          "location": {
            "city": "Ramallah",
            "country": "UAE"
          }
        },
        {
          "id": 17,
          "name": "Bank al Etihad",
          "type": "Corporate",
          "amount": 2706,
          "date": "2025-07-13",
          "is_anonymous": false,
          "location": {
            "city": "Zarqa",
            "country": "Syria"
          }
        },
        {
          "id": 25,
          "name": "Middle East Development Bank",
          "type": "Corporate",
          "amount": 1104,
          "date": "2025-07-13",
          "is_anonymous": false,
          "location": {
            "city": "Irbid",
            "country": "Lebanon"
          }
        },
        {
          "id": 18,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 429,
          "date": "2025-07-12",
          "is_anonymous": true,
          "location": {
            "city": "Amman",
            "country": "Saudi Arabia"
          }
        },
        {
          "id": 10,
          "name": "Global Impact Foundation",
          "type": "Individual",
          "amount": 156,
          "date": "2025-07-08",
          "is_anonymous": false,
          "location": {
            "city": "Zarqa",
            "country": "Jordan"
          }
        },
        {
          "id": 39,
          "name": "Layla Hijazi",
          "type": "Individual",
          "amount": 218,
          "date": "2025-07-08",
          "is_anonymous": false,
          "location": {
            "city": "Irbid",
            "country": "Palestine"
          },
          "message": "Together we can make a real difference."
        },
        {
          "id": 45,
          "name": "David Smith",
          "type": "Individual",
          "amount": 323,
          "date": "2025-07-05",
          "is_anonymous": false,
          "location": {
            "city": "Irbid",
            "country": "Syria"
          },
          "message": "Small businesses are the backbone of our community."
        },
        {
          "id": 49,
          "name": "David Smith",
          "type": "Individual",
          "amount": 52,
          "date": "2025-07-05",
          "is_anonymous": false,
          "location": {
            "city": "Gaza",
            "country": "Jordan"
          }
        },
        {
          "id": 3,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 3659,
          "date": "2025-07-04",
          "is_anonymous": true,
          "location": {
            "city": "Aqaba",
            "country": "Palestine"
          },
          "message": "Supporting sustainable agriculture for generations to come."
        },
        {
          "id": 9,
          "name": "Middle East Development Bank",
          "type": "Corporate",
          "amount": 3172,
          "date": "2025-07-02",
          "is_anonymous": false,
          "location": {
            "city": "Hebron",
            "country": "Syria"
          },
          "message": "Small businesses are the backbone of our community."
        },
        {
          "id": 42,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 401,
          "date": "2025-07-01",
          "is_anonymous": true,
          "location": {
            "city": "Irbid",
            "country": "Saudi Arabia"
          }
        },
        {
          "id": 44,
          "name": "Oasis Technologies",
          "type": "Corporate",
          "amount": 1997,
          "date": "2025-06-30",
          "is_anonymous": false,
          "location": {
            "city": "Gaza",
            "country": "Lebanon"
          }
        },
        {
          "id": 28,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 2624,
          "date": "2025-06-27",
          "is_anonymous": true,
          "location": {
            "city": "Nablus",
            "country": "Syria"
          }
        },
        {
          "id": 29,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 49,
          "date": "2025-06-22",
          "is_anonymous": true,
          "location": {
            "city": "Hebron",
            "country": "Egypt"
          }
        },
        {
          "id": 15,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 518,
          "date": "2025-06-21",
          "is_anonymous": false,
          "location": {
            "city": "Nablus",
            "country": "Qatar"
          }
        },
        {
          "id": 12,
          "name": "Bank al Etihad",
          "type": "Corporate",
          "amount": 4186,
          "date": "2025-06-20",
          "is_anonymous": false,
          "location": {
            "city": "Amman",
            "country": "UAE"
          }
        },
        {
          "id": 19,
          "name": "Jordan Telecom Group",
          "type": "Corporate",
          "amount": 4634,
          "date": "2025-06-20",
          "is_anonymous": false,
          "location": {
            "city": "Ramallah",
            "country": "Qatar"
          }
        },
        {
          "id": 5,
          "name": "Layla Hijazi",
          "type": "Individual",
          "amount": 349,
          "date": "2025-06-18",
          "is_anonymous": false,
          "location": {
            "city": "Nablus",
            "country": "Qatar"
          }
        }
      ],
      "timeline": {
        "created_date": "2024-10-05",
        "target_date": "2025-01-15",
        "last_updated": "2024-12-21"
      },
      "tags": [
        "women-empowerment",
        "microfinance",
        "jordan",
        "rural-development",
        "entrepreneurship"
      ],
      "impact_metrics": {
        "beneficiaries": 100,
        "metric_description": "women will start sustainable small businesses"
      },
      "updates": [
        {
          "date": "2024-12-21",
          "title": "85% Funding Achieved - Almost There!",
          "description": "We're just $22,500 away from our goal! The first cohort of 25 women has already started their businesses with amazing results."
        },
        {
          "date": "2024-12-10",
          "title": "First Business Graduations",
          "description": "Celebrating the graduation of our first 25 participants! Their businesses include handicrafts, food processing, and tailoring services."
        },
        {
          "date": "2024-11-25",
          "title": "Digital Marketplace Launch",
          "description": "Launched an online marketplace where program participants can sell their products to customers across Jordan and beyond."
        }
      ]
    },
    {
      "id": 6,
      "title": "Tech Startup Incubator for Palestinian Youth",
      "category": "Small Business",
      "status": "Active",
      "urgency_level": "Medium",
      "short_description": "Creating a technology startup incubator in Ramallah to support 30 tech entrepreneurs with funding, mentorship, and co-working space.",
      "detailed_description": "Palestine has a highly educated population with strong technical skills, but young entrepreneurs lack access to startup capital, mentorship, and professional networks. This project establishes a comprehensive tech incubator providing co-working space, seed funding of $5000-$25000 per startup, mentorship from successful Palestinian and international entrepreneurs, and connections to global markets. The incubator focuses on software development, mobile apps, e-commerce, and digital services that can serve both local and international markets. We aim to support 30 startups in the first year, creating over 150 high-skilled jobs.",
      "image_url": "/photos/student.jpg",
      "location": {
        "city": "Ramallah",
        "country": "Palestine",
        "region": "Middle East",
        "latitude": 31.9073,
        "longitude": 35.2044
      },
      "metrics": {
        "goal_amount": 200000,
        "raised_amount": 156000,
        "percentage_funded": 78,
        "donor_count": 50,
        "average_donation": 3120,
        "days_remaining": 35,
        "days_active": 330
      },
      "contact": {
        "organization": "Palestinian Innovation & Technology Organization",
        "coordinator": "Omar Qasemi",
        "email": "omar.qasemi@pito.ps",
        "phone": "+970-2-876-5432"
      },
      "donors": [
        {
          "id": 17,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 421,
          "date": "2025-09-13",
          "is_anonymous": true,
          "location": {
            "city": "Amman",
            "country": "Jordan"
          }
        },
        {
          "id": 16,
          "name": "David Smith",
          "type": "Individual",
          "amount": 121,
          "date": "2025-09-12",
          "is_anonymous": false,
          "location": {
            "city": "Aqaba",
            "country": "Lebanon"
          },
          "message": "Education is the key to breaking the cycle of poverty."
        },
        {
          "id": 28,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 151,
          "date": "2025-09-10",
          "is_anonymous": true,
          "location": {
            "city": "Nablus",
            "country": "Jordan"
          }
        },
        {
          "id": 37,
          "name": "Mediterranean Trading Co.",
          "type": "Corporate",
          "amount": 3160,
          "date": "2025-09-07",
          "is_anonymous": false,
          "location": {
            "city": "Nablus",
            "country": "Egypt"
          },
          "message": "Investing in education is investing in tomorrow."
        },
        {
          "id": 40,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 254,
          "date": "2025-09-07",
          "is_anonymous": true,
          "location": {
            "city": "Nablus",
            "country": "Palestine"
          }
        },
        {
          "id": 33,
          "name": "Amman Business Association",
          "type": "Individual",
          "amount": 32,
          "date": "2025-09-05",
          "is_anonymous": false,
          "location": {
            "city": "Aqaba",
            "country": "Syria"
          },
          "message": "Small businesses are the backbone of our community."
        },
        {
          "id": 38,
          "name": "Omar Qasemi",
          "type": "Individual",
          "amount": 440,
          "date": "2025-09-04",
          "is_anonymous": false,
          "location": {
            "city": "Hebron",
            "country": "Egypt"
          }
        },
        {
          "id": 7,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 3793,
          "date": "2025-09-02",
          "is_anonymous": true,
          "location": {
            "city": "Nablus",
            "country": "Qatar"
          }
        },
        {
          "id": 47,
          "name": "Women Entrepreneurs Fund",
          "type": "Foundation",
          "amount": 1700,
          "date": "2025-09-01",
          "is_anonymous": false,
          "location": {
            "city": "Alexandria",
            "country": "Qatar"
          },
          "message": "Every child deserves access to quality education."
        },
        {
          "id": 1,
          "name": "Michael Brown",
          "type": "Individual",
          "amount": 55,
          "date": "2025-08-30",
          "is_anonymous": false,
          "location": {
            "city": "Cairo",
            "country": "Saudi Arabia"
          },
          "message": "May this contribution help build a better future."
        },
        {
          "id": 42,
          "name": "Nour Farouk",
          "type": "Individual",
          "amount": 178,
          "date": "2025-08-30",
          "is_anonymous": false,
          "location": {
            "city": "Irbid",
            "country": "Syria"
          }
        },
        {
          "id": 4,
          "name": "Anonymous Donor",
          "type": "Foundation",
          "amount": 4630,
          "date": "2025-08-27",
          "is_anonymous": true,
          "location": {
            "city": "Hebron",
            "country": "Saudi Arabia"
          }
        },
        {
          "id": 26,
          "name": "Emily Chen",
          "type": "Individual",
          "amount": 359,
          "date": "2025-08-27",
          "is_anonymous": false,
          "location": {
            "city": "Hebron",
            "country": "Syria"
          }
        },
        {
          "id": 43,
          "name": "Michael Brown",
          "type": "Individual",
          "amount": 425,
          "date": "2025-08-23",
          "is_anonymous": false,
          "location": {
            "city": "Ramallah",
            "country": "Palestine"
          }
        },
        {
          "id": 29,
          "name": "David Smith",
          "type": "Individual",
          "amount": 452,
          "date": "2025-08-22",
          "is_anonymous": false,
          "location": {
            "city": "Cairo",
            "country": "Saudi Arabia"
          }
        },
        {
          "id": 13,
          "name": "Levant Construction Group",
          "type": "Corporate",
          "amount": 5898,
          "date": "2025-08-17",
          "is_anonymous": false,
          "location": {
            "city": "Zarqa",
            "country": "Palestine"
          }
        },
        {
          "id": 18,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 334,
          "date": "2025-08-14",
          "is_anonymous": true,
          "location": {
            "city": "Alexandria",
            "country": "Saudi Arabia"
          },
          "message": "May this contribution help build a better future."
        },
        {
          "id": 11,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 36,
          "date": "2025-08-06",
          "is_anonymous": true,
          "location": {
            "city": "Nablus",
            "country": "Qatar"
          }
        },
        {
          "id": 2,
          "name": "Cairo Capital Partners",
          "type": "Corporate",
          "amount": 5764,
          "date": "2025-08-02",
          "is_anonymous": false,
          "location": {
            "city": "Alexandria",
            "country": "Jordan"
          },
          "message": "Together we can make a real difference."
        },
        {
          "id": 12,
          "name": "Zaid Foundation",
          "type": "Individual",
          "amount": 298,
          "date": "2025-08-02",
          "is_anonymous": false,
          "location": {
            "city": "Cairo",
            "country": "UAE"
          }
        },
        {
          "id": 22,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 201,
          "date": "2025-08-01",
          "is_anonymous": true,
          "location": {
            "city": "Zarqa",
            "country": "Qatar"
          }
        },
        {
          "id": 25,
          "name": "Fatima Al-Zahra",
          "type": "Individual",
          "amount": 105,
          "date": "2025-08-01",
          "is_anonymous": false,
          "location": {
            "city": "Cairo",
            "country": "Jordan"
          },
          "message": "Investing in education is investing in tomorrow."
        },
        {
          "id": 49,
          "name": "Cairo Capital Partners",
          "type": "Corporate",
          "amount": 2278,
          "date": "2025-07-30",
          "is_anonymous": false,
          "location": {
            "city": "Hebron",
            "country": "Palestine"
          }
        },
        {
          "id": 19,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 432,
          "date": "2025-07-29",
          "is_anonymous": true,
          "location": {
            "city": "Hebron",
            "country": "Egypt"
          }
        },
        {
          "id": 23,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 1098,
          "date": "2025-07-28",
          "is_anonymous": true,
          "location": {
            "city": "Alexandria",
            "country": "Lebanon"
          },
          "message": "Supporting our farmers means securing our future."
        },
        {
          "id": 46,
          "name": "Zaid Foundation",
          "type": "Individual",
          "amount": 326,
          "date": "2025-07-26",
          "is_anonymous": false,
          "location": {
            "city": "Irbid",
            "country": "Egypt"
          }
        },
        {
          "id": 44,
          "name": "Amman Business Association",
          "type": "Individual",
          "amount": 61,
          "date": "2025-07-24",
          "is_anonymous": false,
          "location": {
            "city": "Ramallah",
            "country": "Qatar"
          }
        },
        {
          "id": 15,
          "name": "Nour Farouk",
          "type": "Individual",
          "amount": 113,
          "date": "2025-07-23",
          "is_anonymous": false,
          "location": {
            "city": "Aqaba",
            "country": "Lebanon"
          },
          "message": "May this contribution help build a better future."
        },
        {
          "id": 9,
          "name": "Nour Farouk",
          "type": "Individual",
          "amount": 277,
          "date": "2025-07-22",
          "is_anonymous": false,
          "location": {
            "city": "Alexandria",
            "country": "Jordan"
          }
        },
        {
          "id": 31,
          "name": "Cairo Community Fund",
          "type": "Individual",
          "amount": 467,
          "date": "2025-07-22",
          "is_anonymous": false,
          "location": {
            "city": "Irbid",
            "country": "Qatar"
          }
        },
        {
          "id": 50,
          "name": "Michael Brown",
          "type": "Individual",
          "amount": 512,
          "date": "2025-07-22",
          "is_anonymous": false,
          "location": {
            "city": "Gaza",
            "country": "Jordan"
          },
          "message": "Every child deserves access to quality education."
        },
        {
          "id": 36,
          "name": "Desert Rose Industries",
          "type": "Corporate",
          "amount": 4749,
          "date": "2025-07-21",
          "is_anonymous": false,
          "location": {
            "city": "Ramallah",
            "country": "UAE"
          }
        },
        {
          "id": 6,
          "name": "Women Entrepreneurs Fund",
          "type": "Individual",
          "amount": 366,
          "date": "2025-07-20",
          "is_anonymous": false,
          "location": {
            "city": "Ramallah",
            "country": "Jordan"
          }
        },
        {
          "id": 30,
          "name": "Levant Construction Group",
          "type": "Corporate",
          "amount": 2139,
          "date": "2025-07-19",
          "is_anonymous": false,
          "location": {
            "city": "Gaza",
            "country": "Palestine"
          },
          "message": "Investing in education is investing in tomorrow."
        },
        {
          "id": 3,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 3261,
          "date": "2025-07-18",
          "is_anonymous": true,
          "location": {
            "city": "Alexandria",
            "country": "Jordan"
          }
        },
        {
          "id": 10,
          "name": "Jordan Education Trust",
          "type": "Foundation",
          "amount": 3023,
          "date": "2025-07-16",
          "is_anonymous": false,
          "location": {
            "city": "Cairo",
            "country": "Palestine"
          }
        },
        {
          "id": 21,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 270,
          "date": "2025-07-15",
          "is_anonymous": true,
          "location": {
            "city": "Nablus",
            "country": "Lebanon"
          }
        },
        {
          "id": 8,
          "name": "Fatima Al-Zahra",
          "type": "Individual",
          "amount": 423,
          "date": "2025-07-14",
          "is_anonymous": false,
          "location": {
            "city": "Alexandria",
            "country": "Lebanon"
          }
        },
        {
          "id": 35,
          "name": "Cairo Community Fund",
          "type": "Individual",
          "amount": 70,
          "date": "2025-07-12",
          "is_anonymous": false,
          "location": {
            "city": "Aqaba",
            "country": "Lebanon"
          },
          "message": "Small businesses are the backbone of our community."
        },
        {
          "id": 24,
          "name": "Jordan Education Trust",
          "type": "Individual",
          "amount": 216,
          "date": "2025-07-11",
          "is_anonymous": false,
          "location": {
            "city": "Irbid",
            "country": "Jordan"
          }
        },
        {
          "id": 27,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 440,
          "date": "2025-07-10",
          "is_anonymous": true,
          "location": {
            "city": "Alexandria",
            "country": "Palestine"
          },
          "message": "Every child deserves access to quality education."
        },
        {
          "id": 41,
          "name": "Fatima Al-Zahra",
          "type": "Individual",
          "amount": 42,
          "date": "2025-07-09",
          "is_anonymous": false,
          "location": {
            "city": "Alexandria",
            "country": "Saudi Arabia"
          }
        },
        {
          "id": 14,
          "name": "Ahmed Al-Rashid",
          "type": "Individual",
          "amount": 334,
          "date": "2025-07-08",
          "is_anonymous": false,
          "location": {
            "city": "Zarqa",
            "country": "Saudi Arabia"
          },
          "message": "Supporting our farmers means securing our future."
        },
        {
          "id": 34,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 341,
          "date": "2025-07-08",
          "is_anonymous": true,
          "location": {
            "city": "Hebron",
            "country": "Egypt"
          }
        },
        {
          "id": 20,
          "name": "Nour Farouk",
          "type": "Individual",
          "amount": 320,
          "date": "2025-07-07",
          "is_anonymous": false,
          "location": {
            "city": "Ramallah",
            "country": "Syria"
          },
          "message": "Supporting our farmers means securing our future."
        },
        {
          "id": 39,
          "name": "Gaza Relief Network",
          "type": "Individual",
          "amount": 158,
          "date": "2025-07-06",
          "is_anonymous": false,
          "location": {
            "city": "Zarqa",
            "country": "Saudi Arabia"
          },
          "message": "Small businesses are the backbone of our community."
        },
        {
          "id": 32,
          "name": "Bank al Etihad",
          "type": "Corporate",
          "amount": 4166,
          "date": "2025-06-21",
          "is_anonymous": false,
          "location": {
            "city": "Gaza",
            "country": "Syria"
          },
          "message": "May this contribution help build a better future."
        },
        {
          "id": 5,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 28,
          "date": "2025-06-19",
          "is_anonymous": true,
          "location": {
            "city": "Hebron",
            "country": "Saudi Arabia"
          },
          "message": "Supporting our farmers means securing our future."
        },
        {
          "id": 48,
          "name": "Nour Farouk",
          "type": "Individual",
          "amount": 495,
          "date": "2025-06-19",
          "is_anonymous": false,
          "location": {
            "city": "Hebron",
            "country": "Palestine"
          }
        },
        {
          "id": 45,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 5110,
          "date": "2025-06-16",
          "is_anonymous": true,
          "location": {
            "city": "Irbid",
            "country": "Jordan"
          }
        }
      ],
      "timeline": {
        "created_date": "2024-10-18",
        "target_date": "2025-02-28",
        "last_updated": "2024-12-20"
      },
      "tags": [
        "tech-startups",
        "entrepreneurship",
        "palestine",
        "innovation",
        "job-creation"
      ],
      "impact_metrics": {
        "beneficiaries": 30,
        "metric_description": "tech entrepreneurs will receive comprehensive startup support"
      },
      "updates": [
        {
          "date": "2024-12-20",
          "title": "Co-working Space Nearly Ready",
          "description": "The 3,000 sq ft co-working space is 90% complete with modern offices, meeting rooms, and high-speed internet infrastructure."
        },
        {
          "date": "2024-12-05",
          "title": "Mentor Network Established",
          "description": "Secured commitments from 15 successful entrepreneurs and tech leaders to serve as mentors for incubator participants."
        },
        {
          "date": "2024-11-20",
          "title": "First Startup Applications Received",
          "description": "Received over 80 applications from aspiring tech entrepreneurs. Selection process for the first cohort begins next month."
        }
      ]
    },
    {
      "id": 7,
      "title": "Rural Healthcare Mobile Clinic - Egypt",
      "category": "Healthcare",
      "status": "Active",
      "urgency_level": "Critical",
      "short_description": "Providing essential healthcare services to remote villages in Upper Egypt through a fully equipped mobile medical clinic.",
      "detailed_description": "Remote villages in Upper Egypt often lack access to basic healthcare, with residents traveling hours to reach the nearest medical facility. This mobile clinic project will serve 25 villages with a population of over 15,000 people, providing primary healthcare, preventive care, maternal health services, and emergency treatment. The clinic will be staffed by qualified doctors, nurses, and paramedics, and will make regular visits to each village on a rotating schedule.",
      "image_url": "/photos/student.jpg",
      "location": {
        "city": "Luxor",
        "country": "Egypt",
        "region": "Middle East",
        "latitude": 25.6872,
        "longitude": 32.6396
      },
      "metrics": {
        "goal_amount": 180000,
        "raised_amount": 98400,
        "percentage_funded": 55,
        "donor_count": 50,
        "average_donation": 1968,
        "days_remaining": 0,
        "days_active": 379
      },
      "contact": {
        "organization": "Egyptian Rural Health Initiative",
        "coordinator": "Dr. Youssef Mansour",
        "email": "youssef.mansour@erhi.org.eg",
        "phone": "+20-95-123-4567"
      },
      "donors": [
        {
          "id": 50,
          "name": "Nour Farouk",
          "type": "Individual",
          "amount": 419,
          "date": "2025-09-04",
          "is_anonymous": false,
          "location": {
            "city": "Cairo",
            "country": "Egypt"
          }
        },
        {
          "id": 31,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 406,
          "date": "2025-08-27",
          "is_anonymous": true,
          "location": {
            "city": "Gaza",
            "country": "UAE"
          }
        },
        {
          "id": 19,
          "name": "Levant Construction Group",
          "type": "Corporate",
          "amount": 4555,
          "date": "2025-08-26",
          "is_anonymous": false,
          "location": {
            "city": "Amman",
            "country": "Egypt"
          },
          "message": "Education is the key to breaking the cycle of poverty."
        },
        {
          "id": 26,
          "name": "Oasis Technologies",
          "type": "Corporate",
          "amount": 5814,
          "date": "2025-08-26",
          "is_anonymous": false,
          "location": {
            "city": "Aqaba",
            "country": "Jordan"
          }
        },
        {
          "id": 12,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 399,
          "date": "2025-08-24",
          "is_anonymous": true,
          "location": {
            "city": "Cairo",
            "country": "Palestine"
          },
          "message": "Every child deserves access to quality education."
        },
        {
          "id": 1,
          "name": "Cairo Capital Partners",
          "type": "Corporate",
          "amount": 1055,
          "date": "2025-08-22",
          "is_anonymous": false,
          "location": {
            "city": "Amman",
            "country": "UAE"
          },
          "message": "Education is the key to breaking the cycle of poverty."
        },
        {
          "id": 32,
          "name": "David Smith",
          "type": "Individual",
          "amount": 357,
          "date": "2025-08-21",
          "is_anonymous": false,
          "location": {
            "city": "Zarqa",
            "country": "UAE"
          }
        },
        {
          "id": 45,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 158,
          "date": "2025-08-20",
          "is_anonymous": false,
          "location": {
            "city": "Cairo",
            "country": "Saudi Arabia"
          },
          "message": "Investing in education is investing in tomorrow."
        },
        {
          "id": 27,
          "name": "Omar Qasemi",
          "type": "Individual",
          "amount": 313,
          "date": "2025-08-17",
          "is_anonymous": false,
          "location": {
            "city": "Amman",
            "country": "Qatar"
          }
        },
        {
          "id": 41,
          "name": "Gaza Relief Network",
          "type": "Individual",
          "amount": 383,
          "date": "2025-08-15",
          "is_anonymous": false,
          "location": {
            "city": "Hebron",
            "country": "Lebanon"
          }
        },
        {
          "id": 49,
          "name": "Jordan Education Trust",
          "type": "Individual",
          "amount": 273,
          "date": "2025-08-15",
          "is_anonymous": false,
          "location": {
            "city": "Gaza",
            "country": "Syria"
          },
          "message": "Together we can make a real difference."
        },
        {
          "id": 37,
          "name": "Zaid Foundation",
          "type": "Individual",
          "amount": 33,
          "date": "2025-08-12",
          "is_anonymous": false,
          "location": {
            "city": "Nablus",
            "country": "Saudi Arabia"
          }
        },
        {
          "id": 10,
          "name": "Amman Business Association",
          "type": "Foundation",
          "amount": 1819,
          "date": "2025-08-10",
          "is_anonymous": false,
          "location": {
            "city": "Cairo",
            "country": "UAE"
          },
          "message": "May this contribution help build a better future."
        },
        {
          "id": 43,
          "name": "Mohammed Hassan",
          "type": "Individual",
          "amount": 279,
          "date": "2025-08-10",
          "is_anonymous": false,
          "location": {
            "city": "Gaza",
            "country": "UAE"
          },
          "message": "Together we can make a real difference."
        },
        {
          "id": 8,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 116,
          "date": "2025-08-09",
          "is_anonymous": false,
          "location": {
            "city": "Alexandria",
            "country": "Syria"
          }
        },
        {
          "id": 25,
          "name": "Global Impact Foundation",
          "type": "Individual",
          "amount": 485,
          "date": "2025-08-09",
          "is_anonymous": false,
          "location": {
            "city": "Zarqa",
            "country": "Saudi Arabia"
          }
        },
        {
          "id": 6,
          "name": "Middle East Development Bank",
          "type": "Corporate",
          "amount": 5364,
          "date": "2025-08-08",
          "is_anonymous": false,
          "location": {
            "city": "Aqaba",
            "country": "Qatar"
          }
        },
        {
          "id": 13,
          "name": "Omar Qasemi",
          "type": "Individual",
          "amount": 161,
          "date": "2025-08-05",
          "is_anonymous": false,
          "location": {
            "city": "Hebron",
            "country": "Syria"
          }
        },
        {
          "id": 14,
          "name": "Fatima Al-Zahra",
          "type": "Individual",
          "amount": 510,
          "date": "2025-08-04",
          "is_anonymous": false,
          "location": {
            "city": "Cairo",
            "country": "Saudi Arabia"
          },
          "message": "May this contribution help build a better future."
        },
        {
          "id": 3,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 431,
          "date": "2025-07-29",
          "is_anonymous": true,
          "location": {
            "city": "Gaza",
            "country": "Jordan"
          }
        },
        {
          "id": 9,
          "name": "Desert Rose Industries",
          "type": "Corporate",
          "amount": 2815,
          "date": "2025-07-29",
          "is_anonymous": false,
          "location": {
            "city": "Gaza",
            "country": "Jordan"
          }
        },
        {
          "id": 44,
          "name": "Layla Hijazi",
          "type": "Foundation",
          "amount": 3309,
          "date": "2025-07-29",
          "is_anonymous": false,
          "location": {
            "city": "Zarqa",
            "country": "Egypt"
          }
        },
        {
          "id": 20,
          "name": "Global Impact Foundation",
          "type": "Individual",
          "amount": 290,
          "date": "2025-07-26",
          "is_anonymous": false,
          "location": {
            "city": "Irbid",
            "country": "Jordan"
          },
          "message": "Supporting sustainable agriculture for generations to come."
        },
        {
          "id": 2,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 90,
          "date": "2025-07-25",
          "is_anonymous": true,
          "location": {
            "city": "Amman",
            "country": "Lebanon"
          }
        },
        {
          "id": 4,
          "name": "Jordan Education Trust",
          "type": "Individual",
          "amount": 478,
          "date": "2025-07-25",
          "is_anonymous": false,
          "location": {
            "city": "Hebron",
            "country": "Syria"
          }
        },
        {
          "id": 36,
          "name": "Cairo Community Fund",
          "type": "Individual",
          "amount": 260,
          "date": "2025-07-24",
          "is_anonymous": false,
          "location": {
            "city": "Nablus",
            "country": "Egypt"
          }
        },
        {
          "id": 11,
          "name": "Nour Farouk",
          "type": "Individual",
          "amount": 498,
          "date": "2025-07-21",
          "is_anonymous": false,
          "location": {
            "city": "Amman",
            "country": "Jordan"
          },
          "message": "Investing in education is investing in tomorrow."
        },
        {
          "id": 35,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 178,
          "date": "2025-07-20",
          "is_anonymous": true,
          "location": {
            "city": "Zarqa",
            "country": "Lebanon"
          }
        },
        {
          "id": 7,
          "name": "Gaza Relief Network",
          "type": "Individual",
          "amount": 166,
          "date": "2025-07-17",
          "is_anonymous": false,
          "location": {
            "city": "Cairo",
            "country": "Egypt"
          }
        },
        {
          "id": 42,
          "name": "Anonymous Donor",
          "type": "Foundation",
          "amount": 3421,
          "date": "2025-07-17",
          "is_anonymous": false,
          "location": {
            "city": "Aqaba",
            "country": "Qatar"
          }
        },
        {
          "id": 40,
          "name": "Jordan Education Trust",
          "type": "Individual",
          "amount": 119,
          "date": "2025-07-15",
          "is_anonymous": false,
          "location": {
            "city": "Gaza",
            "country": "Syria"
          },
          "message": "Investing in education is investing in tomorrow."
        },
        {
          "id": 47,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 446,
          "date": "2025-07-15",
          "is_anonymous": true,
          "location": {
            "city": "Irbid",
            "country": "Jordan"
          }
        },
        {
          "id": 22,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 331,
          "date": "2025-07-12",
          "is_anonymous": true,
          "location": {
            "city": "Aqaba",
            "country": "Lebanon"
          }
        },
        {
          "id": 15,
          "name": "Tech for Good Initiative",
          "type": "Individual",
          "amount": 468,
          "date": "2025-07-11",
          "is_anonymous": false,
          "location": {
            "city": "Ramallah",
            "country": "Saudi Arabia"
          },
          "message": "May this contribution help build a better future."
        },
        {
          "id": 23,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 295,
          "date": "2025-07-10",
          "is_anonymous": true,
          "location": {
            "city": "Hebron",
            "country": "Palestine"
          },
          "message": "Together we can make a real difference."
        },
        {
          "id": 28,
          "name": "Ahmed Al-Rashid",
          "type": "Individual",
          "amount": 265,
          "date": "2025-07-10",
          "is_anonymous": false,
          "location": {
            "city": "Alexandria",
            "country": "Syria"
          }
        },
        {
          "id": 5,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 492,
          "date": "2025-07-08",
          "is_anonymous": false,
          "location": {
            "city": "Cairo",
            "country": "Syria"
          }
        },
        {
          "id": 39,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 146,
          "date": "2025-07-08",
          "is_anonymous": false,
          "location": {
            "city": "Zarqa",
            "country": "Lebanon"
          }
        },
        {
          "id": 38,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 256,
          "date": "2025-07-07",
          "is_anonymous": true,
          "location": {
            "city": "Nablus",
            "country": "Palestine"
          }
        },
        {
          "id": 48,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 4485,
          "date": "2025-07-07",
          "is_anonymous": true,
          "location": {
            "city": "Nablus",
            "country": "Lebanon"
          }
        },
        {
          "id": 46,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 522,
          "date": "2025-07-06",
          "is_anonymous": true,
          "location": {
            "city": "Amman",
            "country": "Jordan"
          }
        },
        {
          "id": 29,
          "name": "Anonymous Donor",
          "type": "Foundation",
          "amount": 4700,
          "date": "2025-07-05",
          "is_anonymous": false,
          "location": {
            "city": "Hebron",
            "country": "Lebanon"
          },
          "message": "Education is the key to breaking the cycle of poverty."
        },
        {
          "id": 34,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 403,
          "date": "2025-07-05",
          "is_anonymous": true,
          "location": {
            "city": "Ramallah",
            "country": "Lebanon"
          }
        },
        {
          "id": 16,
          "name": "David Smith",
          "type": "Individual",
          "amount": 356,
          "date": "2025-06-28",
          "is_anonymous": false,
          "location": {
            "city": "Cairo",
            "country": "Syria"
          },
          "message": "May this contribution help build a better future."
        },
        {
          "id": 33,
          "name": "Palestinian Heritage Society",
          "type": "Individual",
          "amount": 439,
          "date": "2025-06-26",
          "is_anonymous": false,
          "location": {
            "city": "Cairo",
            "country": "Lebanon"
          },
          "message": "Small businesses are the backbone of our community."
        },
        {
          "id": 18,
          "name": "Sarah Johnson",
          "type": "Individual",
          "amount": 331,
          "date": "2025-06-23",
          "is_anonymous": false,
          "location": {
            "city": "Cairo",
            "country": "Syria"
          }
        },
        {
          "id": 30,
          "name": "Levant Construction Group",
          "type": "Corporate",
          "amount": 2137,
          "date": "2025-06-23",
          "is_anonymous": false,
          "location": {
            "city": "Gaza",
            "country": "Egypt"
          }
        },
        {
          "id": 21,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 193,
          "date": "2025-06-22",
          "is_anonymous": true,
          "location": {
            "city": "Gaza",
            "country": "Palestine"
          },
          "message": "Supporting our farmers means securing our future."
        },
        {
          "id": 17,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 385,
          "date": "2025-06-21",
          "is_anonymous": false,
          "location": {
            "city": "Alexandria",
            "country": "Palestine"
          }
        },
        {
          "id": 24,
          "name": "Fatima Al-Zahra",
          "type": "Individual",
          "amount": 208,
          "date": "2025-06-17",
          "is_anonymous": false,
          "location": {
            "city": "Nablus",
            "country": "Saudi Arabia"
          },
          "message": "May this contribution help build a better future."
        }
      ],
      "timeline": {
        "created_date": "2024-08-30",
        "target_date": "2025-02-15",
        "last_updated": "2024-12-16"
      },
      "tags": [
        "healthcare",
        "rural-access",
        "egypt",
        "mobile-clinic",
        "primary-care"
      ],
      "impact_metrics": {
        "beneficiaries": 15000,
        "metric_description": "rural residents will gain access to regular healthcare services"
      },
      "updates": [
        {
          "date": "2024-12-16",
          "title": "Medical Equipment Ordered",
          "description": "Ordered essential medical equipment including diagnostic tools, emergency supplies, and portable laboratory equipment."
        },
        {
          "date": "2024-11-30",
          "title": "Medical Team Recruitment",
          "description": "Successfully recruited 2 doctors, 3 nurses, and 2 paramedics for the mobile clinic team."
        }
      ]
    },
    {
      "id": 8,
      "title": "Reforestation Project - Jordan Valley",
      "category": "Environment",
      "status": "Funded",
      "urgency_level": "Low",
      "short_description": "Completed reforestation project that planted 10,000 native trees in the Jordan Valley to combat desertification and create green jobs.",
      "detailed_description": "This successful project addressed desertification in the Jordan Valley by planting 10,000 native trees including olive, carob, and indigenous desert species. The project created temporary employment for 50 local workers and established a sustainable tree nursery. The project has successfully improved soil stability, increased biodiversity, and created green corridors for wildlife. Long-term monitoring shows a 95% tree survival rate and measurable improvements in local air quality.",
      "image_url": "/photos/student.jpg",
      "location": {
        "city": "Jordan Valley",
        "country": "Jordan",
        "region": "Middle East",
        "latitude": 32,
        "longitude": 35.6
      },
      "metrics": {
        "goal_amount": 65000,
        "raised_amount": 68500,
        "percentage_funded": 105,
        "donor_count": 46,
        "average_donation": 1489,
        "days_active": 500
      },
      "contact": {
        "organization": "Jordan Environmental Foundation",
        "coordinator": "Layla Khoury",
        "email": "layla.khoury@jef.jo",
        "phone": "+962-6-234-5678"
      },
      "donors": [
        {
          "id": 5,
          "name": "Omar Qasemi",
          "type": "Individual",
          "amount": 319,
          "date": "2025-09-13",
          "is_anonymous": false,
          "location": {
            "city": "Amman",
            "country": "Qatar"
          },
          "message": "Every child deserves access to quality education."
        },
        {
          "id": 24,
          "name": "Aramex Foundation",
          "type": "Corporate",
          "amount": 1279,
          "date": "2025-09-12",
          "is_anonymous": false,
          "location": {
            "city": "Ramallah",
            "country": "Egypt"
          }
        },
        {
          "id": 34,
          "name": "Desert Rose Industries",
          "type": "Corporate",
          "amount": 2568,
          "date": "2025-09-11",
          "is_anonymous": false,
          "location": {
            "city": "Cairo",
            "country": "Syria"
          }
        },
        {
          "id": 36,
          "name": "Sarah Johnson",
          "type": "Individual",
          "amount": 182,
          "date": "2025-09-10",
          "is_anonymous": false,
          "location": {
            "city": "Amman",
            "country": "Jordan"
          },
          "message": "Small businesses are the backbone of our community."
        },
        {
          "id": 37,
          "name": "Sarah Johnson",
          "type": "Individual",
          "amount": 191,
          "date": "2025-09-09",
          "is_anonymous": false,
          "location": {
            "city": "Alexandria",
            "country": "Egypt"
          },
          "message": "Together we can make a real difference."
        },
        {
          "id": 11,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 420,
          "date": "2025-09-08",
          "is_anonymous": true,
          "location": {
            "city": "Irbid",
            "country": "Palestine"
          },
          "message": "May this contribution help build a better future."
        },
        {
          "id": 17,
          "name": "Fatima Al-Zahra",
          "type": "Individual",
          "amount": 142,
          "date": "2025-09-06",
          "is_anonymous": false,
          "location": {
            "city": "Aqaba",
            "country": "UAE"
          }
        },
        {
          "id": 25,
          "name": "Zaid Foundation",
          "type": "Individual",
          "amount": 90,
          "date": "2025-09-06",
          "is_anonymous": false,
          "location": {
            "city": "Irbid",
            "country": "Palestine"
          },
          "message": "Small businesses are the backbone of our community."
        },
        {
          "id": 12,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 1449,
          "date": "2025-09-04",
          "is_anonymous": true,
          "location": {
            "city": "Cairo",
            "country": "Palestine"
          }
        },
        {
          "id": 28,
          "name": "Levant Construction Group",
          "type": "Corporate",
          "amount": 5293,
          "date": "2025-08-29",
          "is_anonymous": false,
          "location": {
            "city": "Ramallah",
            "country": "Qatar"
          },
          "message": "Investing in education is investing in tomorrow."
        },
        {
          "id": 42,
          "name": "Tech for Good Initiative",
          "type": "Individual",
          "amount": 492,
          "date": "2025-08-29",
          "is_anonymous": false,
          "location": {
            "city": "Aqaba",
            "country": "Jordan"
          }
        },
        {
          "id": 31,
          "name": "Cairo Capital Partners",
          "type": "Corporate",
          "amount": 5946,
          "date": "2025-08-26",
          "is_anonymous": false,
          "location": {
            "city": "Cairo",
            "country": "Lebanon"
          },
          "message": "Education is the key to breaking the cycle of poverty."
        },
        {
          "id": 20,
          "name": "Women Entrepreneurs Fund",
          "type": "Individual",
          "amount": 245,
          "date": "2025-08-25",
          "is_anonymous": false,
          "location": {
            "city": "Gaza",
            "country": "Egypt"
          }
        },
        {
          "id": 3,
          "name": "Jordan Education Trust",
          "type": "Individual",
          "amount": 75,
          "date": "2025-08-23",
          "is_anonymous": false,
          "location": {
            "city": "Gaza",
            "country": "Lebanon"
          }
        },
        {
          "id": 27,
          "name": "Zaid Foundation",
          "type": "Individual",
          "amount": 255,
          "date": "2025-08-22",
          "is_anonymous": false,
          "location": {
            "city": "Gaza",
            "country": "Qatar"
          }
        },
        {
          "id": 39,
          "name": "Desert Rose Industries",
          "type": "Corporate",
          "amount": 1320,
          "date": "2025-08-21",
          "is_anonymous": false,
          "location": {
            "city": "Nablus",
            "country": "Saudi Arabia"
          },
          "message": "Education is the key to breaking the cycle of poverty."
        },
        {
          "id": 10,
          "name": "Emily Chen",
          "type": "Individual",
          "amount": 457,
          "date": "2025-08-20",
          "is_anonymous": false,
          "location": {
            "city": "Ramallah",
            "country": "Syria"
          },
          "message": "Together we can make a real difference."
        },
        {
          "id": 30,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 264,
          "date": "2025-08-16",
          "is_anonymous": true,
          "location": {
            "city": "Cairo",
            "country": "Qatar"
          },
          "message": "May this contribution help build a better future."
        },
        {
          "id": 4,
          "name": "Anonymous Donor",
          "type": "Foundation",
          "amount": 3832,
          "date": "2025-08-15",
          "is_anonymous": true,
          "location": {
            "city": "Amman",
            "country": "Qatar"
          },
          "message": "Investing in education is investing in tomorrow."
        },
        {
          "id": 15,
          "name": "Jordan Education Trust",
          "type": "Individual",
          "amount": 342,
          "date": "2025-08-15",
          "is_anonymous": false,
          "location": {
            "city": "Zarqa",
            "country": "UAE"
          }
        },
        {
          "id": 18,
          "name": "Tech for Good Initiative",
          "type": "Individual",
          "amount": 453,
          "date": "2025-08-14",
          "is_anonymous": false,
          "location": {
            "city": "Hebron",
            "country": "UAE"
          },
          "message": "Small businesses are the backbone of our community."
        },
        {
          "id": 45,
          "name": "Heritage Investment Fund",
          "type": "Corporate",
          "amount": 3722,
          "date": "2025-08-14",
          "is_anonymous": false,
          "location": {
            "city": "Amman",
            "country": "Jordan"
          },
          "message": "Investing in education is investing in tomorrow."
        },
        {
          "id": 35,
          "name": "Cairo Capital Partners",
          "type": "Corporate",
          "amount": 5752,
          "date": "2025-08-10",
          "is_anonymous": false,
          "location": {
            "city": "Irbid",
            "country": "Lebanon"
          }
        },
        {
          "id": 44,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 394,
          "date": "2025-08-08",
          "is_anonymous": true,
          "location": {
            "city": "Hebron",
            "country": "UAE"
          }
        },
        {
          "id": 6,
          "name": "Aramex Foundation",
          "type": "Corporate",
          "amount": 3186,
          "date": "2025-08-07",
          "is_anonymous": false,
          "location": {
            "city": "Cairo",
            "country": "UAE"
          }
        },
        {
          "id": 7,
          "name": "Palestinian Heritage Society",
          "type": "Individual",
          "amount": 211,
          "date": "2025-07-30",
          "is_anonymous": false,
          "location": {
            "city": "Cairo",
            "country": "Jordan"
          },
          "message": "Investing in education is investing in tomorrow."
        },
        {
          "id": 19,
          "name": "Jordan Education Trust",
          "type": "Individual",
          "amount": 432,
          "date": "2025-07-25",
          "is_anonymous": false,
          "location": {
            "city": "Zarqa",
            "country": "Lebanon"
          },
          "message": "Together we can make a real difference."
        },
        {
          "id": 2,
          "name": "Mohammed Hassan",
          "type": "Individual",
          "amount": 382,
          "date": "2025-07-21",
          "is_anonymous": false,
          "location": {
            "city": "Irbid",
            "country": "UAE"
          }
        },
        {
          "id": 23,
          "name": "Anonymous Donor",
          "type": "Corporate",
          "amount": 3536,
          "date": "2025-07-20",
          "is_anonymous": true,
          "location": {
            "city": "Hebron",
            "country": "Palestine"
          }
        },
        {
          "id": 32,
          "name": "Gaza Relief Network",
          "type": "Individual",
          "amount": 485,
          "date": "2025-07-18",
          "is_anonymous": false,
          "location": {
            "city": "Hebron",
            "country": "Saudi Arabia"
          },
          "message": "Investing in education is investing in tomorrow."
        },
        {
          "id": 21,
          "name": "Tech for Good Initiative",
          "type": "Individual",
          "amount": 135,
          "date": "2025-07-17",
          "is_anonymous": false,
          "location": {
            "city": "Ramallah",
            "country": "Saudi Arabia"
          },
          "message": "Education is the key to breaking the cycle of poverty."
        },
        {
          "id": 26,
          "name": "Mohammed Hassan",
          "type": "Individual",
          "amount": 475,
          "date": "2025-07-16",
          "is_anonymous": false,
          "location": {
            "city": "Aqaba",
            "country": "UAE"
          },
          "message": "Supporting sustainable agriculture for generations to come."
        },
        {
          "id": 16,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 135,
          "date": "2025-07-15",
          "is_anonymous": true,
          "location": {
            "city": "Irbid",
            "country": "UAE"
          },
          "message": "Every child deserves access to quality education."
        },
        {
          "id": 8,
          "name": "Oasis Technologies",
          "type": "Corporate",
          "amount": 3553,
          "date": "2025-07-14",
          "is_anonymous": false,
          "location": {
            "city": "Nablus",
            "country": "Qatar"
          },
          "message": "Every child deserves access to quality education."
        },
        {
          "id": 29,
          "name": "Tech for Good Initiative",
          "type": "Individual",
          "amount": 371,
          "date": "2025-07-13",
          "is_anonymous": false,
          "location": {
            "city": "Ramallah",
            "country": "Palestine"
          }
        },
        {
          "id": 1,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 389,
          "date": "2025-07-09",
          "is_anonymous": true,
          "location": {
            "city": "Gaza",
            "country": "UAE"
          },
          "message": "Supporting our farmers means securing our future."
        },
        {
          "id": 43,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 501,
          "date": "2025-07-09",
          "is_anonymous": true,
          "location": {
            "city": "Ramallah",
            "country": "Lebanon"
          }
        },
        {
          "id": 14,
          "name": "David Smith",
          "type": "Foundation",
          "amount": 1444,
          "date": "2025-07-04",
          "is_anonymous": false,
          "location": {
            "city": "Gaza",
            "country": "Palestine"
          },
          "message": "May this contribution help build a better future."
        },
        {
          "id": 40,
          "name": "Anonymous Donor",
          "type": "Individual",
          "amount": 388,
          "date": "2025-06-29",
          "is_anonymous": true,
          "location": {
            "city": "Irbid",
            "country": "UAE"
          },
          "message": "Every child deserves access to quality education."
        },
        {
          "id": 33,
          "name": "David Smith",
          "type": "Individual",
          "amount": 136,
          "date": "2025-06-25",
          "is_anonymous": false,
          "location": {
            "city": "Ramallah",
            "country": "Syria"
          }
        },
        {
          "id": 9,
          "name": "Emily Chen",
          "type": "Individual",
          "amount": 395,
          "date": "2025-06-20",
          "is_anonymous": false,
          "location": {
            "city": "Nablus",
            "country": "Syria"
          }
        },
        {
          "id": 13,
          "name": "Aramex Foundation",
          "type": "Corporate",
          "amount": 5082,
          "date": "2025-06-19",
          "is_anonymous": false,
          "location": {
            "city": "Zarqa",
            "country": "Egypt"
          },
          "message": "Investing in education is investing in tomorrow."
        },
        {
          "id": 22,
          "name": "Oasis Technologies",
          "type": "Corporate",
          "amount": 3876,
          "date": "2025-06-19",
          "is_anonymous": false,
          "location": {
            "city": "Gaza",
            "country": "Syria"
          }
        },
        {
          "id": 41,
          "name": "Aramex Foundation",
          "type": "Corporate",
          "amount": 5641,
          "date": "2025-06-19",
          "is_anonymous": false,
          "location": {
            "city": "Zarqa",
            "country": "Saudi Arabia"
          }
        },
        {
          "id": 38,
          "name": "Mediterranean Trading Co.",
          "type": "Corporate",
          "amount": 2203,
          "date": "2025-06-17",
          "is_anonymous": false,
          "location": {
            "city": "Zarqa",
            "country": "Qatar"
          }
        },
        {
          "id": 46,
          "name": "Heritage Investment Fund",
          "type": "Corporate",
          "amount": 62,
          "date": "2025-06-17",
          "is_anonymous": false,
          "location": {
            "city": "Hebron",
            "country": "Syria"
          }
        }
      ],
      "timeline": {
        "created_date": "2024-05-01",
        "target_date": "2024-10-31",
        "completed_date": "2024-10-25",
        "last_updated": "2024-11-01"
      },
      "tags": [
        "reforestation",
        "environment",
        "jordan",
        "climate-action",
        "green-jobs"
      ],
      "impact_metrics": {
        "beneficiaries": 10000,
        "metric_description": "trees planted, creating habitat and improving air quality for the region"
      },
      "updates": [
        {
          "date": "2024-11-01",
          "title": "Project Successfully Completed!",
          "description": "All 10,000 trees have been planted and initial survival rates exceed expectations at 95%."
        },
        {
          "date": "2024-10-25",
          "title": "Final Planting Phase Complete",
          "description": "Completed the final phase of tree planting. Community volunteers joined for the celebration ceremony."
        }
      ]
    }
  ],
  "filters": {
    "available_categories": [
      "Education",
      "Agriculture",
      "Small Business",
      "Healthcare",
      "Environment"
    ],
    "available_statuses": [
      "Active",
      "Funded",
      "Cancelled",
      "Paused"
    ],
    "available_urgency_levels": [
      "Low",
      "Medium",
      "High",
      "Critical"
    ],
    "available_locations": [
      "Palestine",
      "Jordan",
      "Egypt"
    ],
    "applied": {
      "category": null,
      "status": null,
      "urgency": null,
      "location": null,
      "causeId": null
    }
  }
};
// --- UTILITY FUNCTIONS ---
// Formats a number as a currency string.
const formatCurrency = (value: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value);
};

// Formats a number as a short currency string with k/M/B suffixes for axes.
const formatCurrencyShort = (value: number): string | number => {
  if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)}B`;
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value;
};

// Formats a number as a percentage string.
const formatPercentage = (value: number): string => `${value.toFixed(0)}%`;

// Determines the text color for profit/loss values based on whether they are positive or negative.
const getPnlClass = (pnl: number): string => pnl >= 0 ? 'text-green-600' : 'text-red-600';

// --- CHILD COMPONENTS ---
// Displays a single key performance indicator (KPI) with a title and value.
const KpiCard = ({ title, value, className = '' }: { title: string, value: string | number, className?: string }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className={`text-2xl font-semibold ${className}`}>{value}</p>
  </div>
);

// Renders a single card for a fundraising cause.
const CauseCard = ({ cause }: { cause: any }) => ( // يمكن استبدال 'any' بواجهة (interface) أفضل
  <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
    <img src={cause.image_url} alt={cause.title} className="w-full h-48 object-cover" />
    <div className="p-4 flex-grow">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-500">{cause.category}</span>
        <span className="text-sm text-gray-400">{cause.location.country}</span>
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{cause.title}</h3>
      <p className="text-gray-700 text-sm mb-4 line-clamp-3">{cause.short_description}</p>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${cause.metrics.percentage_funded}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-sm font-semibold">
        <span>Raised: {formatCurrency(cause.metrics.raised_amount)}</span>
        <span>Goal: {formatCurrency(cause.metrics.goal_amount)}</span>
      </div>
    </div>
  </div>
);

// --- MAIN PAGE COMPONENT ---
export default function HomePage() {
  const [filter, setFilter] = useState({ sector: 'All', country: 'All' });
  const [sort, setSort] = useState({ key: 'title', direction: 'asc' });

  // UseMemo to filter and sort data efficiently
  const filteredAndSortedCauses = useMemo(() => {
    let filtered = amanaData.causes;
    
    // Apply filtering
    if (filter.sector !== 'All') {
      filtered = filtered.filter(cause => cause.category === filter.sector);
    }
    if (filter.country !== 'All') {
      filtered = filtered.filter(cause => cause.location.country === filter.country);
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      const aValue = a.metrics[sort.key as keyof typeof a.metrics] || a[sort.key as keyof typeof a];
      const bValue = b.metrics[sort.key as keyof typeof b.metrics] || b[sort.key as keyof typeof b];

      if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filter, sort]);

  const uniqueCategories = useMemo(() => ['All', ...new Set(amanaData.causes.map(c => c.category))], []);
  const uniqueCountries = useMemo(() => ['All', ...new Set(amanaData.causes.map(c => c.location.country))], []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <main className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto">
<div className="bg-white p-6 rounded-lg shadow-md mb-8">
  <h1 className="text-3xl font-bold text-center">Amana Fundraising Dashboard</h1>
</div>        {/* Statistics section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {Object.entries(amanaData.fundraising_stats).map(([key, value]: [string, any]) => (
            <KpiCard
              key={key}
              title={key.replace(/_/g, ' ').toUpperCase()}
              value={
                key.includes('amount') || key.includes('donation')
                  ? formatCurrency(value)
                  : value
              }
            />
          ))}
        </div>

        {/* Filters section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
          <div className="w-full md:w-1/2">
            <label htmlFor="sector-filter" className="block text-sm font-medium text-gray-700">Filter by Category:</label>
            <select
              id="sector-filter"
              name="sector"
              value={filter.sector}
              onChange={handleFilterChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              {uniqueCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/2">
            <label htmlFor="country-filter" className="block text-sm font-medium text-gray-700">Filter by Country:</label>
            <select
              id="country-filter"
              name="country"
              value={filter.country}
              onChange={handleFilterChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              {uniqueCountries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Causes section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedCauses.length > 0 ? (
            filteredAndSortedCauses.map(cause => (
              <CauseCard key={cause.id} cause={cause} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No causes found for the selected filters.</p>
          )}
        </div>
      </div>
    </main>
  );
}