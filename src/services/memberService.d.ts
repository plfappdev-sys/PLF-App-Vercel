// Type declarations for MemberService class
declare const MemberService: {
  initializeMemberData(): Promise<void>;
  verifyMemberNumber(memberNumber: string): Promise<boolean>;
  isMemberNumberTaken(memberNumber: string): Promise<boolean>;
  linkMemberToUser(memberNumber: string, userId: string): Promise<void>;
  getUserByMemberNumber(memberNumber: string): Promise<string | null>;
  createMember(memberData: {
    memberNumber: string;
    firstName: string;
    lastName: string;
    idNumber: string;
    joinDate: Date;
  }): Promise<void>;
  getMember(memberNumber: string): Promise<any>;
};

export default MemberService;
