import { useState } from 'react';
import {
  ArrowLeft, Shield, CheckCircle, XCircle, Clock, Star, Briefcase,
  FileText, Image as ImageIcon, Phone, Mail, MapPin, AlertCircle
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { toast } from 'sonner@2.0.3';

interface LaborerVerificationProps {
  onBack: () => void;
}

interface VerificationRequest {
  id: string;
  laborId: string;
  laborName: string;
  email: string;
  phone: string;
  location: string;
  skills: string[];
  experience: string;
  bio: string;
  documents: {
    idCard?: string;
    certification?: string;
    portfolio?: string[];
  };
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
}

const mockRequests: VerificationRequest[] = [
  {
    id: '1',
    laborId: 'labor_001',
    laborName: 'Arben Hoxha',
    email: 'arben.hoxha@example.com',
    phone: '+355 69 234 5678',
    location: 'Tirana, Albania',
    skills: ['Plumbing', 'Electrical', 'HVAC'],
    experience: '10 years',
    bio: 'Experienced plumber with expertise in residential and commercial projects. Licensed and insured.',
    documents: {
      idCard: 'id_card_001.jpg',
      certification: 'plumber_cert.pdf',
      portfolio: ['work1.jpg', 'work2.jpg', 'work3.jpg']
    },
    requestDate: '2025-10-21T08:00:00Z',
    status: 'pending'
  },
  {
    id: '2',
    laborId: 'labor_002',
    laborName: 'Elena Krasniqi',
    email: 'elena.krasniqi@example.com',
    phone: '+355 69 678 9012',
    location: 'Tirana, Albania',
    skills: ['Carpentry', 'Furniture Assembly'],
    experience: '8 years',
    bio: 'Professional carpenter specializing in custom furniture and renovations.',
    documents: {
      idCard: 'id_card_002.jpg',
      certification: 'carpenter_cert.pdf',
      portfolio: ['work4.jpg', 'work5.jpg']
    },
    requestDate: '2025-10-20T14:30:00Z',
    status: 'pending'
  },
  {
    id: '3',
    laborId: 'labor_003',
    laborName: 'Besart Shehu',
    email: 'besart.shehu@example.com',
    phone: '+355 69 345 6789',
    location: 'Durrës, Albania',
    skills: ['Painting', 'Drywall'],
    experience: '5 years',
    bio: 'Detail-oriented painter with experience in residential and commercial painting.',
    documents: {
      idCard: 'id_card_003.jpg',
      portfolio: ['work6.jpg']
    },
    requestDate: '2025-10-19T10:15:00Z',
    status: 'pending'
  },
  {
    id: '4',
    laborId: 'labor_004',
    laborName: 'Linda Berisha',
    email: 'linda.berisha@example.com',
    phone: '+355 69 456 7890',
    location: 'Vlorë, Albania',
    skills: ['Cleaning', 'Home Organization'],
    experience: '3 years',
    bio: 'Professional cleaner providing thorough and reliable cleaning services.',
    documents: {
      idCard: 'id_card_004.jpg'
    },
    requestDate: '2025-10-18T16:00:00Z',
    status: 'approved'
  },
  {
    id: '5',
    laborId: 'labor_005',
    laborName: 'Dritan Marku',
    email: 'dritan.marku@example.com',
    phone: '+355 69 567 8901',
    location: 'Shkodër, Albania',
    skills: ['Electrician'],
    experience: '2 years',
    bio: 'Electrician looking to provide electrical services.',
    documents: {},
    requestDate: '2025-10-17T09:00:00Z',
    status: 'rejected',
    rejectionReason: 'Incomplete documentation - missing ID card and certifications'
  },
];

export default function LaborerVerification({ onBack }: LaborerVerificationProps) {
  const [requests, setRequests] = useState<VerificationRequest[]>(mockRequests);
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');

  const filteredRequests = requests.filter(req => req.status === activeTab);

  const stats = {
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
  };

  const handleApprove = (request: VerificationRequest) => {
    setRequests(requests.map(r =>
      r.id === request.id ? { ...r, status: 'approved' as const } : r
    ));
    toast.success(`${request.laborName} has been verified!`);
    setShowReviewDialog(false);
    setSelectedRequest(null);
  };

  const handleReject = (request: VerificationRequest) => {
    if (!rejectionReason.trim()) {
      toast.error('Please provide a reason for rejection');
      return;
    }
    setRequests(requests.map(r =>
      r.id === request.id ? { ...r, status: 'rejected' as const, rejectionReason } : r
    ));
    toast.success(`Verification rejected for ${request.laborName}`);
    setShowReviewDialog(false);
    setSelectedRequest(null);
    setRejectionReason('');
  };

  const openReviewDialog = (request: VerificationRequest) => {
    setSelectedRequest(request);
    setShowReviewDialog(true);
    setRejectionReason('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-900 hover:bg-gray-200 transition-all active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-gray-900">Laborer Verification</h1>
              <p className="text-gray-600 text-sm">Review and approve laborer verification requests</p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-yellow-50 rounded-xl p-4 text-center">
              <Clock className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
              <p className="text-2xl text-yellow-900">{stats.pending}</p>
              <p className="text-sm text-yellow-700">Pending Review</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-2xl text-green-900">{stats.approved}</p>
              <p className="text-sm text-green-700">Approved</p>
            </div>
            <div className="bg-red-50 rounded-xl p-4 text-center">
              <XCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
              <p className="text-2xl text-red-900">{stats.rejected}</p>
              <p className="text-sm text-red-700">Rejected</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="mb-6 bg-white rounded-xl p-1 shadow-sm">
            <TabsTrigger value="pending" className="rounded-lg relative">
              Pending
              {stats.pending > 0 && (
                <Badge className="ml-2 bg-yellow-600 text-white">{stats.pending}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="approved" className="rounded-lg">
              Approved ({stats.approved})
            </TabsTrigger>
            <TabsTrigger value="rejected" className="rounded-lg">
              Rejected ({stats.rejected})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xl">
                        {request.laborName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-gray-900 mb-1">{request.laborName}</h3>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Mail className="w-3.5 h-3.5" />
                              {request.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="w-3.5 h-3.5" />
                              {request.phone}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {request.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-3.5 h-3.5" />
                              {request.experience}
                            </span>
                          </div>
                        </div>
                        <Badge
                          className={
                            request.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : request.status === 'approved'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }
                        >
                          {request.status}
                        </Badge>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {request.skills.map((skill, idx) => (
                          <Badge key={idx} className="bg-blue-100 text-blue-700">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      {/* Bio */}
                      <p className="text-sm text-gray-700 mb-3">{request.bio}</p>

                      {/* Documents */}
                      <div className="bg-gray-50 rounded-xl p-4 mb-3">
                        <p className="text-sm text-gray-700 mb-2">Submitted Documents:</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {request.documents.idCard && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <FileText className="w-4 h-4 text-green-600" />
                              <span>ID Card</span>
                            </div>
                          )}
                          {request.documents.certification && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <FileText className="w-4 h-4 text-green-600" />
                              <span>Certification</span>
                            </div>
                          )}
                          {request.documents.portfolio && request.documents.portfolio.length > 0 && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <ImageIcon className="w-4 h-4 text-green-600" />
                              <span>Portfolio ({request.documents.portfolio.length})</span>
                            </div>
                          )}
                          {!request.documents.idCard && !request.documents.certification && !request.documents.portfolio && (
                            <div className="flex items-center gap-2 text-sm text-red-600">
                              <AlertCircle className="w-4 h-4" />
                              <span>No documents submitted</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Rejection Reason */}
                      {request.status === 'rejected' && request.rejectionReason && (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-3">
                          <p className="text-sm text-red-900">
                            <strong>Rejection Reason:</strong> {request.rejectionReason}
                          </p>
                        </div>
                      )}

                      {/* Submitted Date */}
                      <p className="text-xs text-gray-500">
                        Submitted on {new Date(request.requestDate).toLocaleString()}
                      </p>

                      {/* Actions */}
                      {request.status === 'pending' && (
                        <div className="flex gap-3 mt-4">
                          <Button
                            onClick={() => openReviewDialog(request)}
                            className="flex-1 bg-[#0077FF] hover:bg-[#0066EE] text-white rounded-xl"
                          >
                            Review Application
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {filteredRequests.length === 0 && (
                <div className="text-center py-16">
                  <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-gray-900 mb-2">No {activeTab} requests</h3>
                  <p className="text-gray-500 text-sm">
                    {activeTab === 'pending' 
                      ? 'All verification requests have been reviewed'
                      : `No ${activeTab} verification requests`}
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Review Dialog */}
      <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Review Verification Request</DialogTitle>
            <DialogDescription>Review documents and verify laborer credentials</DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6">
              {/* Laborer Info */}
              <div className="flex items-center gap-4 pb-4 border-b">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-2xl">
                    {selectedRequest.laborName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-gray-900 mb-1">{selectedRequest.laborName}</h2>
                  <p className="text-gray-600">{selectedRequest.email}</p>
                  <p className="text-gray-600 text-sm">{selectedRequest.phone}</p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <p className="text-gray-900">{selectedRequest.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Experience</p>
                  <p className="text-gray-900">{selectedRequest.experience}</p>
                </div>
              </div>

              {/* Skills */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {selectedRequest.skills.map((skill, idx) => (
                    <Badge key={idx} className="bg-blue-100 text-blue-700">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Professional Bio</p>
                <p className="text-gray-900 bg-gray-50 rounded-xl p-4">{selectedRequest.bio}</p>
              </div>

              {/* Documents */}
              <div>
                <p className="text-sm text-gray-500 mb-3">Submitted Documents</p>
                <div className="space-y-2">
                  {selectedRequest.documents.idCard ? (
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-gray-900">ID Card</span>
                      </div>
                      <Button size="sm" variant="ghost" className="text-[#0077FF]">
                        View
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center bg-red-50 border border-red-200 rounded-xl p-3">
                      <XCircle className="w-5 h-5 text-red-600 mr-3" />
                      <span className="text-red-900">ID Card - Not Submitted</span>
                    </div>
                  )}
                  
                  {selectedRequest.documents.certification ? (
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-gray-900">Professional Certification</span>
                      </div>
                      <Button size="sm" variant="ghost" className="text-[#0077FF]">
                        View
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl p-3">
                      <AlertCircle className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">Professional Certification - Not Submitted</span>
                    </div>
                  )}

                  {selectedRequest.documents.portfolio && selectedRequest.documents.portfolio.length > 0 ? (
                    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-gray-900">Portfolio ({selectedRequest.documents.portfolio.length} images)</span>
                      </div>
                      <Button size="sm" variant="ghost" className="text-[#0077FF]">
                        View
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl p-3">
                      <AlertCircle className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="text-gray-600">Portfolio - Not Submitted</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Rejection Reason Input */}
              <div>
                <p className="text-sm text-gray-500 mb-2">Rejection Reason (if rejecting)</p>
                <Textarea
                  placeholder="Enter reason for rejection..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="rounded-xl"
                  rows={3}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  onClick={() => handleReject(selectedRequest)}
                  variant="outline"
                  className="flex-1 border-red-200 text-red-600 hover:bg-red-50 rounded-xl"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button
                  onClick={() => handleApprove(selectedRequest)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve & Verify
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
